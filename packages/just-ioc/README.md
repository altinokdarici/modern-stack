# just-ioc
Simple and tiny IOC Container for JS/TS 

# Installation
npm i just-ioc

# Setup

```
import { Container } from 'just-ioc'

interface CustomServices {
  ["ImageComparer"]: IImageComparer;
  ["ImageFileService"]: IImageFileService;
}

const container: Container<CustomServices> = new Container<CustomServices>()
  .register("ImageFileService", () => new ImageFileService(), {
    lifetime: Lifetime.Singleton
  })
  .register(
    "ImageComparer",
    () => new ImageComparer(container.resolve(ServiceTypes.ImageFileService)),
    {
      lifetime: Lifetime.Singleton
    }
  );
```

# Resolve

```
  const imageComparer = container.resolve("ImageComparer");
  imageComparer.areDifferent(...)
```
