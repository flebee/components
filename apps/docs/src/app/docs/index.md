> Default a blockquote

> **Note**
> This is a note blockquote

> **Warning**
> This is a warning blockquote

> **Alert**
> This is an alert blockquote

```typescript name="my-file.ts"
const myVar = 'Hello world';
```

```typescript group="my-group1" name="world"
const myVar = 'Hi world!';
```

```typescript group="my-group1" name="mom"
const myVar = 'Hi Mom!';
```

```typescript group="my-group2" name="world"
const myVar = 'Hi world!';
```

```typescript group="my-group2" name="mom" active
const myVar = 'Hi Mom!';
```

```typescript {3}
const myVar = 'Hello world';

console.log(myVar);
```

```typescript {1,3-5,8}
import { NgDocPage } from '@ng-doc/core';

const NicePage: NgDocPage = {
  title: `What a nice page!`,
  mdFile: './index.md'
};

export default NicePage;
```
