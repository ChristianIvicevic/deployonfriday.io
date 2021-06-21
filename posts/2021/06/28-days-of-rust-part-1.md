---
title: "28 Days of Rust - Part 1: Ownership and the Borrow Checker"
description: >-
  Let me introduce you to the unique selling point of Rust, the strict notion of ownership along with its Borrow Checker.
date: 2021-06-21
category: Rust
---

## Introduction

It has been a few months now since I started with graphics programming in my free time.
Initially I picked up C++ as my programming language of choice since I was already fairly experienced with it.
After I learned the basics of the OpenGL rendering API I wanted to move on to Vulkan and made the bold move to try out Rust simultaneously after getting sick of the notorious undefined behaviors and difficulties with C++.

This series of blog posts will summarize some select features I encountered and my opinions about those.
Please be advised that this will be rather high-level and you should consider these posts to be a first introduction to terminology and features.
If you happen to be interested in more details please refer to the following resources:

* [The Rust Programming Language](https://doc.rust-lang.org/book/) - This is considered to be the de facto starter resource for anybody interested in Rust.
* [Rust By Example](https://doc.rust-lang.org/rust-by-example/index.html) - Alternatively this book is for those who don't want to read some technical documentation or prosaic explanations and just want to see code.

## Outline

Currently I am planning to release the following set of blog posts, but the contents are subject to change:

1. Ownership and the Borrow Checker
2. OOP and polymorphism through traits
3. Monads as first-class citizens
4. Documentation and testing
5. Compiler toolchain and the ecosystem
6. Use cases for Rust

## Static analysis and guarantees for the memory

Let's dive right into the feature that makes Rust so different from other languages, the concept of ownership and the verification using the Borrow Checker.
If you've ever programmed in Java you may be familiar with the infamous and often unexpected `NullPointerException`.
An indicator that an object that you're trying to access happens to be `null` when you least expect it.

![The Spanish Inquisition from Monty Python's Flying Circus](images/2021/06/spanish-inquisition.jpeg)

Unfortunately this exception occurs during runtime and it may be annoying to see this faulty behavior and memory issue in production.

Rust uses the concept of ownership to introduce borrow checking in order to prevent this and similar errors from occurring during runtime by statically analyzing your code during compile time.
Yes, you have read correctly, it can prevent certain runtime errors during compilation.
Similar to how Typescript brought strict type safety to Javascript, Rust enforces guarantees for the memory it operates on as long as developers follow certain rules and patterns.

### Ownership

Unlike in languages with garbage collection such as Java or C# passing objects in Rust is done explicitly either by-value or by-reference.
By default every function takes their arguments by-value using a move operation passing ownership along unless otherwise specified.
The three common scenarios are the following:

```rust
// This function takes full ownership of the argument.
fn take_ownership(object: Object) {}
// This function borrows an immutable reference of the argument.
fn borrow_object(object: &Object) {}
// This function borrows a mutable reference of the argument.
fn borrow_mutable_object(object: &mut Object) {}
```

Rusts Borrow Checker will ensure that you do not attempt to access an object that does no longer exist in the current scope:

```rust
fn main() {
    // Retrieve our sample object.
    let object: Object = /* ... */;
    // Pass a reference to the object into `borrow_object`.
    // The current scope still has full ownership of `object`.
    borrow_object(&object);
    // Move the entire object into `take_ownership`.
    // The current scope has no longer ownership of `object`.
    take_ownership(object);
    // Attempt to pass a reference to the object we no longer own.
    borrow_object(&object);
}
```

The attempt to invoke `borrow_object` a second time is invalid since we passed ownership previously and we are not allowed to access it ever again for the rest of the scope:

```text
error[E0382]: borrow of moved value: `object`
  --> src/main.rs:16:19
   |
 8 |     let object: Object = /* ... */;
   |         ------ move occurs because `object` has type `Object`, which does not implement the `Copy` trait
...
14 |     take_ownership(object);
   |                    ------ value moved here
15 |     // Attempt to pass a reference to and object we no longer own.
16 |     borrow_object(&object);
   |                   ^^^^^^^ value borrowed here after move
```

### Borrowing of local variables

Another common example is to prevent the existence of two mutable references to the very same object in the same scope.
In such a case the compiler can not guarantee that the object you want to operate on using one of those references hasn't been mutated unexpectedly via the other mutable reference:

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &mut s; // First mutable reference
    let r2 = &mut s; // Second mutable reference

    println!("{}, {}", r1, r2);
}
```

Attempting to run that program will cause the compiler to error as follows:

```text
error[E0499]: cannot borrow `s` as mutable more than once at a time
 --> src/main.rs:5:14
  |
4 |     let r1 = &mut s;
  |              ------ first mutable borrow occurs here
5 |     let r2 = &mut s;
  |              ^^^^^^ second mutable borrow occurs here
6 |
7 |     println!("{}, {}", r1, r2);
  |                        -- first borrow later used here
```

As explained, the compiler cannot guarantee that the reference `r1` hasn't been altered somehow since there exists a definition for a second mutable reference.

In general, you can have as many immutable references to the same object as you want, but at most one mutable reference per object in the same scope.

## My opinion on the Borrow Checker

In theory the Borrow Checker is an awesome concept and in those small example snippets it looks really useful and does its job just fine.
However I had some serious issues when trying to apply my old mental models I had from C++ to Rust as some of my code that always worked would not pass the strict rules of the Borrow Checker due to some really odd cases where it wasn't guarantee to behave correctly which did never occur anyways.
It was really difficult to learn some of the rules and intricacies, especially when handling objects or passing objects into lambdas where the system was too strict for my taste.

An actual benefit is the guarantee that certain errors will never occur during runtime and memory issues are the most common problem in system-programming.
Unfortunately I did not profit off of it so far since I have been working with a lot of unsafe code where those guarantees cannot be applied to.

At least the compiler has descriptive errors messages and explains the cause for most of the errors one will run into when battling the Borrow Checker.
