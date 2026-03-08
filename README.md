# blobs

A React library to generate animated procedural SVG blobs.

## Installation

```bash
npm install blobs
```

## Usage

### Simple Example

```tsx
import { Blob, generateBlob } from 'blobs';

const MyComponent = () => {
  const blobData = generateBlob(200, 200);

  return (
    <Blob {...blobData} animated={true} />
  );
};
```

### Manual Blob Generation

You can use the `generateBlob` function to create the descriptor for a blob, which includes its path, eyes, and colors.

```tsx
import { generateBlob } from 'blobs';

const blob = generateBlob(width, height);
// returns BlobDescriptor
```

### Component Props

The `Blob` component accepts the following props:

- `animated`: (boolean) Whether the blob should have eye-rolling animations.
- `className`: (string) Optional CSS class for the SVG element.
- `...BlobDescriptor`: All fields from the descriptor returned by `generateBlob`.

## Features

- **Procedural Generation**: Every blob is unique.
- **Animated**: Fun eye animations that can be triggered randomly or by interaction.
- **Customizable**: Control the dimensions and style of your blobs.

## License

MIT
