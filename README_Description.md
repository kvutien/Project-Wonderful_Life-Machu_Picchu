# Repository Description — Project Machu Picchu-*Wonderful Life*
*(February 2025)*

The project *Wonderful Life* is coded in TypeScript and using Next.js.

## Root folder
The sources in the root folder include a list of **dependencies**, a configuration file for **Tailwind CSS**, a **TypeScript** compiler options configuration file, and a **Next.js** configuration file.

### Dependencies List:

*   The list in file `package.json` specifies details for various **Node.js modules**, including **versions, resolved locations, integrity checksums, and licenses**.
*   It encompasses modules such as `@babel`, `@emotion`, `@eslint`, `@ethersproject`, `@lit`, `@marsidev/react-turnstile`, `@next`, `@noble/hashes`, `@pinata/sdk`, `axios`, `buffer`, `chalk`, `cookie-es`, `elliptic`, `eslint`, `form-data`, `js-yaml`, `lokijs`, `react`, `uuid`, `viem`, and many others.

### .env file
Some environment variables are set by a `.env` file that is not made public by git
They can be found with the command 
``` zsh
kvutien@MacBookPro Wonderful_Life % grep -r "process.env" .
./app/layout.tsx:          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
./app/providers.tsx:      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
./utils/profileProcessor.ts:const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
./utils/ipfsUtils.ts:const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
./utils/ipfsUtils.ts:const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
./components/helper/HelperProgramsList.tsx:const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
./lib/pinata.ts:const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
./lib/pinata.ts:const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
```
List of environment vqiqbles
- NEXT_PUBLIC_PRIVY_APP_ID
- NEXT_PUBLIC_PRIVY_APP_ID
- NEXT_PUBLIC_GEMINI_API_KEY
- NEXT_PUBLIC_GEMINI_API_KEY
- NEXT_PUBLIC_PINATA_API_KEY
- NEXT_PUBLIC_PINATA_API_KEY
- NEXT_PUBLIC_PINATA_SECRET_KEY
- NEXT_PUBLIC_PINATA_SECRET_KEY

### Tailwind CSS Configuration File:

*   There are two Tailwind CSS configuration files.
*   One file is `postcss.config.mjs`, a **configuration object for PostCSS**, which includes **Tailwind CSS** as a plugin.
    *   The `config` object exports a default configuration.
    *   The `plugins` section specifies that **Tailwind CSS** should be used.
*   The other file is `tailwind.config.ts`, it imports the `Config` type from "tailwindcss".
    *   The `content` array specifies the file paths to be scanned for classes.
    *   The `theme` section allows customisation of the default design tokens.
        *   The `extend` section allows extending the default Tailwind theme.
        *   The `colors` section defines the background and foreground colours using CSS variables.
    *   The `plugins` array is empty.

### Notes about Tailwind CSS and PostCSS
***CSS** (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML, controlling layout, colors, fonts, and overall visual design.*

#### Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom user interfaces without encouraging any two sites to look the same. Unlike traditional CSS frameworks like Bootstrap, which come with pre-designed components, Tailwind CSS focuses on providing utility classes that you can compose to create your own designs.

**Key Features of Tailwind CSS:**

- **Utility-First**: Tailwind provides a wide range of utility classes for layout, spacing, colors, typography, and more. These classes can be composed to build complex designs directly in your HTML.

- **Responsive Design**: Tailwind includes responsive variants for all its utilities, allowing you to easily create responsive designs using classes like `sm:`, `md:`, `lg:`, etc.

- **Customizable**: Tailwind is highly customizable. You can configure the design system by editing the `tailwind.config.js` file to match your project's requirements.

- **PurgeCSS**: Tailwind uses PurgeCSS to remove unused styles in production, resulting in smaller CSS files and faster load times.

- **Plugins**: Tailwind supports plugins, allowing you to extend its functionality with additional utilities or custom configurations.

#### PostCSS

PostCSS is a tool for transforming CSS with JavaScript plugins. It is not a CSS framework but rather a tool that allows you to use various plugins to extend and automate CSS processing. PostCSS can be used to add features to CSS that are not available by default, such as autoprefixing, nesting, variables, and more.

**Key Features of PostCSS:**

- **Plugin-Based**: PostCSS itself does not do anything; its functionality comes from plugins. You can choose which plugins to use based on your project's needs.

- **Autoprefixer**: One of the most popular PostCSS plugins is Autoprefixer, which automatically adds vendor prefixes to CSS rules, ensuring compatibility across different browsers.

- **CSS-in-JS**: PostCSS can be used in JavaScript environments to process CSS, making it a popular choice for CSS-in-JS solutions.

- **Custom Syntax**: PostCSS allows you to use custom syntax and features in your CSS, such as nesting, variables, and mixins, through plugins like `postcss-nested` and `postcss-simple-vars`.

- **Optimization**: PostCSS can optimize your CSS by minifying it, removing duplicates, and performing other optimizations through plugins like `cssnano`.

**Using Tailwind CSS with PostCSS:**

Tailwind CSS is often used in conjunction with PostCSS. When setting up a Tailwind CSS project, you typically configure PostCSS to process your CSS files, allowing you to use Tailwind's utility classes along with other PostCSS plugins for additional functionality and optimization.

In summary, Tailwind CSS is a utility-first CSS framework that provides a set of utility classes for building custom designs, while PostCSS is a tool for transforming CSS with JavaScript plugins, allowing you to extend and automate CSS processing.

### TypeScript Compiler Options Configuration:

*   This file (`tsconfig.json`) configures the TypeScript compiler.
*   `compilerOptions` specifies various compiler settings:
    *   `lib` includes definitions for the DOM, DOM iterable APIs, and modern ECMAScript features.
    *   `allowJs` allows JavaScript files to be compiled alongside TypeScript files.
    *   `skipLibCheck` skips type checking of declaration files to reduce compilation time.
    *   `strict` enables all strict type checking options.
    *   `noEmit` prevents the compiler from emitting output files.
    *   `esModuleInterop` enables interoperability between CommonJS and ES Modules.
    *   `module` sets the module system to use (ESNext).
    *   `moduleResolution` specifies how modules are resolved (Bundler).
    *   `resolveJsonModule` allows importing JSON files as modules.
    *   `isolatedModules` ensures that each file can be compiled independently.
    *   `jsx` preserves JSX syntax in the output.
    *   `incremental` enables incremental compilation for faster rebuilds.
    *   `plugins` specifies additional plugins to use during compilation, including the Next.js plugin.
    *   `paths` defines path aliases for simplified module imports.
*   `include` specifies the files to include in the compilation, including TypeScript files, JSX files, and Next.js types.
*   `exclude` specifies the files and directories to exclude from compilation, such as `node_modules`.

### Next.js Configuration File:

*   The file exports a `nextConfig` object.
*   This object is of the type `NextConfig` imported from 'next'.
*   The configuration object is currently empty.

### Note about Next.js
A Next.js application is a React application. Next.js is a framework built on top of React that provides additional features and conventions for building server-side rendered (SSR) and static web applications.

In a typical Next.js application, the entry point is not an `index.html` file as you might find in a traditional React application. Instead, Next.js uses a different structure and conventions:

- **Pages Directory**: Next.js uses a **pages** directory to define the routes of your application. Each file in the **pages** directory automatically becomes a route. For example, a file named `index.js` or `index.tsx` in the **pages** directory serves as the entry point for the root URL of the application. 
  
  In this project,  the **app** folder serves as equivalent to the **pages** folder.

- **Automatic Code Splitting**: Next.js handles code splitting automatically, so you don't need to manually configure an entry point like `index.html`. Instead, Next.js compiles and serves the necessary JavaScript and HTML for each page.

- **Server-Side Rendering**: Next.js can pre-render pages on the server at request time (SSR) or at build time (static generation). This is handled by Next.js internally, and you don't need to configure an entry point manually.

- **Custom Server**: If you need a custom server or additional server-side logic, you can create a custom server using Node.js. In this case, you would typically create a file like `server.js` and use it to start your Next.js application with additional server-side logic.

In summary, while a traditional React application might use an `index.html` file as the entry point, a Next.js application uses the **pages** directory to define routes and entry points, with Next.js handling the compilation and serving of the application.

## Other folders
In a React or Next.js project, several of these folders are commonly used, each serving a specific purpose. Here's a breakdown of what each folder might contain if it is created by React or Next.js:

- **app**: This folder is often used to store the main application components and logic. In a Next.js project, the `app` directory can be used to define routes and components using the new App Router introduced in Next.js 13.

  👉 In this project,  the **app** folder serves as equivalent to the usual Next.js **pages** folder. It contains a `page.tsx` as well as the **api** folder that contains React routes to handle form submissions, to fetch data from a database, or to perform other server-side operations (here it calls on the Privy authentication service).

- **components**: This folder is commonly used to store reusable UI components. Each component typically has its own file or subdirectory, making it easier to manage and reuse components across the application.

  👉 In this project,  the **components** folder contains a **chatbot** folder and a **helper** folder that contains React routes to handle a chatbot and to collect the parameters of a helper program.

- **data**: This folder is not specific to React or Next.js but can be used to store static data files, such as JSON files, that the application might need. It's not typically created by React or Next.js itself but can be part of a project structure.

  👉 In this project,  the **data** folder contains the TypeScript code to collect the profile of a person in need, makes a vector embedding and stores the results on IPFS.

- **hooks**: This folder is used to store custom React hooks. Hooks are functions that let you use state and other React features in functional components. Custom hooks allow you to extract and reuse logic across different components.

  👉 In this project,  the **hooks** folder contains the TypeScript code to authenticate the user using the Privy service.

- **images**: This folder is used to store image assets used in the README.md file. It's not created by React or Next.js but is a common practice to organize assets in a separate folder.

- **lib**: This folder can be used to store utility functions or libraries that are used across the application. It's not specific to React or Next.js but can be part of a project structure.

  👉 In this project,  the **lib** folder contains the TypeScript code to call the PINATA service to store the profiles on IPFS.

- **public**: This folder is created by React when you set up a new project using Create React App, and by Next.js when you initialize a new project. It contains static files that are served directly by the web server, such as the `index.html` file and other assets like images or favicons.

  👉 In this project,  the **public** folder contains only the Machu Picchu logos.

- **types**: This folder is used to store TypeScript type definitions if you are using TypeScript in your React or Next.js project. It helps in organizing type declarations and interfaces.

- **utils**: This folder is used to store utility functions and helpers that are used across the application. It's not specific to React or Next.js but is a common practice to keep utility code separate from component logic.

  👉 In this project,  the **utils** folder contains the actual TypeScript code to  make a vector embedding, store the results on IPFS and do similarity checks.

In summary, folders like `components`, `hooks`, `public`, and `utils` are commonly used in React and Next.js projects and serve specific purposes related to organizing components, custom hooks, static files, and utility functions, respectively. The other folders can also be part of a React or Next.js project but are not specific to these frameworks themselves.