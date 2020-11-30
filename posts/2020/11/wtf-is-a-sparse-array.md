---
title: WTF Is... - A Sparse Array?
description: >-
  In this post I am explaining how difficult it can be to write a functional iteration using inline arrays in Javascript and which bugs may occur.
date: 2020-11-28
category: Javascript
---

When writing code I often find myself in need of a simple iteration.
Either to call a function multiple times or in the context of React to render the same component multiple times.
Such iterations are usually described imperatively using `for` loops in Javascript:

```tsx
const List = ({ listItems }) => {
  const children = [];
  for (const listItem in listItems) {
    children.push(<li>{listItem}</li>);
  }
  return <ul>{children}</ul>;
};
```

Personally I feel this snippet is way too verbose and not idiomatic, especially compared to iterations over collections with JSX to create respective React components as follows:

```tsx
const List = ({ listItems }) => (
  <ul>
    {listItems.map((listItem, index) => (
      <li key={index}>{listItem}</li>
    ))}
  </ul>
);
```

Furthermore the classic syntax using a `for` loop cannot be used inline in JSX code, therefore I often rely on arrays supplied via props or defining arrays of length `N` inline to repeat something `N` times:

```tsx
const Parent = () => (
  <div>
    {Array(5).map((_, index) => <Child key={index} />)}
  </div>
);
```

However this snippet **is wrong** and leads to some unexpected behavior if you're not familiar how Javascript engines handle arrays internally.
In this post I will explain the reason the previous snippet will not work as expected.

## The caveat of the `Array` constructor

Have you ever attempted to create an array of specific length and inspected the actual result?

```tsx
Array(5);
// -> [empty x 5]
```

So far the result seems reasonable and we can start doing something with it.
For instance we can attempt to return the first 5 even numbers `[0, 2, 4, 6, 8]`.
Intuitevely one would use [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to create this array:

```tsx
Array(5).map((_, index) => 2 * index);
// -> [empty x 5]
```

What's that? 😱

Surprisingly we get the same empty array as a result.
The reason is although our array has a definitive `length` of 5, it is completely *empty*, so it has no elements at all, not even `undefined` or `null`.
This means that the elements of an array aren't initialized when creating the array itself preserving memory and reducing the time it takes to allocate such an array.

If you've ever come across matrices in Mathematics you may be familiar with the notion that they can be diagonal, i.e. all values outside of the diagonal are always 0.
Instead of representing a diagonal matrix as a data structure with `N` &times; `N` fields with most of them being 0, it is more common to only store their diagonal elements.

Internally our current array is *almost* equal to the following object which has no array elements:

```tsx
const emptyArray = {
  length: 5,
  __proto__: Array(0),
};
```

*(The actual difference of this special object and real arrays is an interesting topic I'll remember for a future blog post.)*

Data structures that don't allocate memory for elements that aren't explicitly defined are called **sparse**; a data structure that is not sparse is being referred to as **dense**.
Arrays in Javascript and many other programming languages are sparse by default and behave similar to hash maps.

## Defining dense arrays

In contrast to our previous examples, explicitly defining a dense array yields the expected result of our initial exercise:

```tsx
[undefined, undefined, undefined, undefined, undefined].map(
  (_, index) => 2 * index,
);
// -> [0, 2, 4, 6, 8]
```

You may rightfully say that this is not dynamic at all and prone to mistakes so there are a few ways to create dense arrays in Javascript depending on the use case.
In order to create an array with fixed length that contains the same element multiple times you can use the [`Array.fill`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) method:

```tsx
Array(5).fill(42);
// -> [42, 42, 42, 42, 42]
```

However if the value is of no use to you and you just need a dense array of fixed length, you can spread the result of the constructor into a new array:

```tsx
[...Array(5)];
// -> [undefined, undefined, undefined, undefined, undefined]
```

Ultimately if you want a range of numbers from 0 to a fixed upper bound, you can leverage the [`Array.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) method that will return a proper iterator, even for sparse arrays, that can be spread into a new array yielding the following:

```tsx
[...Array(5).keys()];
// -> [0, 1, 2, 3, 4]
```

Personally I like to use the last snippet for a more customizable `range` function unless the project I am currently working on already has included [`rambda`](https://ramdajs.com/) which provides its own [`range`](https://ramdajs.com/docs/#range) method out of the box.

```tsx
const range = (size: number, startAt = 0) =>
  [...Array(size).keys()].map(index => index + startAt);
```

## Conclusion

Going back to the wrong snippet of repeating the same child component multiple times a correct version is either of the following:

```tsx
const ParentSpread = () => (
  <div>
    {[...Array(5)].map((_, index) => <Child key={index} />)}
  </div>
);

const ParentKeysSpread = () => (
  <div>
    {[...Array(5).keys()].map(index => <Child key={index} />)}
  </div>
);

const ParentRange = () => (
  <div>
    {/* Assuming either a custom range method or the rambda version */}
    {range(5).map((_, index) => <Child key={index} />)}
  </div>
);
```
