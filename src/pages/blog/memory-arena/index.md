---
title: Memory Arena
author: Alexandre Chêne
description: Memory management with pre-allocation. 
date: '2019-10-31T00:00:00.000Z'
---

For my game, I decided to store almost every entity in a big chunk of memory allocated only once when the program boot. I am using this technique for three reasons. First, I want full and precise control over how memory is managed in the game, second I want better data locality in order to increase cache hits from the cpu, and finally, at runtime asking the operating system in order to allocate more memory is slow.

All future entities will be stored inside this already allocated array called “data”.

```rust
pub struct Arena<T: Debug> {
    data: Vec<T>,
    handles: Vec<MemoryHandle>,
    // Index of dirty handles.
    free_handles: Vec<usize>,
    version_count: usize,
}

// Sneaky tl;dr example:
fn main() {
  // Initialize an arena of f32, with a maximum size of 10mb.
  let arena = Arena::<f32>::size_alloc(10);

  // Insert new values.
  let handle_1 = arena.insert(1.5);
  let handle_2 = arena.insert(2.5);
  let handle_3 = arena.insert(3.5);

  // Display values.
  dbg!(arena.get(&handle_1));
  dbg!(arena.get(&handle_2));
  dbg!(arena.get(&handle_3));

  // Remove a value.
  arena.remove(handle_1);

  // Iterate over all the values.
  // So here, you won't see the value from handle_1.
  arena.iter().for_each(|value| {
    dbg!(value);
  });
}
```

In Rust, you could specify the capacity of the vector when initializing it with the method `with_capacity`. Until the capacity isn’t reached, every push to the vector will be “free” (no allocation).

Because I want full control over the memory consumption of my game while developping it; if the amount of memory is exceeded (capacity is reached), the program crash.

```rust
#[test]
#[should_panic]
fn exceed_allocated_reserve() {
    // Allocate 10Mb.
    let mut arena = Arena::<bool>::size_alloc(10);
    let mut last_handle = MemoryHandle::default();
    // Push elements of 1 byte.
    for _ in 0..1000_0000 {
        last_handle = arena.insert(true);
    }

    assert_eq!(last_handle.value, 999_9999);

    // Panic here.
    arena.insert(true);
}
```

I managed all stored entities with handles, and we always refer to a stored entity by his Handle. Handles are storing the index of the entity inside the data vector. If an entity is “removed”, we mark his handle as dirty.

```rust
#[derive(Debug, Default, Copy, Clone)]
pub struct MemoryHandle {
  // The entity index
  value: usize,
  is_dirty: bool,
  // More on this later…
  version: usize,
}
```

So when we insert a new value in the arena, we get a memory handle ready to be used for getting the value.

```rust
#[test]
fn store_new_block() {
    let mut arena = Arena::<bool>::size_alloc(10);
    let handle_0 = arena.insert(true);
    let handle_1 = arena.insert(true);

    assert_eq!(handle_0.value, 0);
    assert_eq!(handle_1.value, 1);
    assert_ne!(handle_0, handle_1);
}
```

Each time we want to read or mutate an entity we use the handle.

```rust
// My value is a pointer of the stored value.
let my_value = arena.get(&handle);
// And if we want to mutate the value…
let my_mut_value = arena.get_mut(&handle);
```

As I said, when we remove an entity, we only mark his handle as dirty, but we also push the index of this dirty handle to an array. Like that, we could re-use our “dirty” handles and replace the “removed” data with a new one.

Example of this pooling system:

```rust
#[test]
fn remove_block() {
    let mut arena = Arena::<bool>::size_alloc(10);
    let handle_0 = arena.insert(true);
    let handle_1 = arena.insert(true);

    assert_eq!(handle_0.version, 1);
    assert_eq!(handle_1.version, 2);
    arena.remove(handle_0);
    assert_eq!(arena.handles[0].is_dirty, true);

    let handle_2 = arena.insert(false);
    assert_eq!(handle_2.version, 3);

    assert_eq!(arena.data[0], false);
}
```

I am versioning every newly generated handle, and increment the version counter every time. So we can’t mess up handles. Comparing an old handle (freed since) and a new one, while both are referring to the same entity index; we won’t have any problems because the “version” isn’t the same.

```rust
impl PartialEq for MemoryHandle {
    fn eq(&self, other: &Self) -> bool {
        self.value == other.value && self.version == other.version
    }
}

```

Also, I have a flush method, to mark all current handles as dirty, and push them into the re-use pool. It’s perfect when we want to load a new scene :)

```rust
#[test]
fn flush() {
    let mut arena = Arena::<bool>::size_alloc(10);
    let handle_0 = arena.insert(true);
    let _ = arena.insert(true);
    let _ = arena.insert(true);

    assert_eq!(*arena.get(&handle_0), true);

    arena.flush();

    let should_panic = catch_unwind(|| arena.get(&handle_0));
    assert_eq!(should_panic.is_err(), true);
}
```

That’s all for now! :)
