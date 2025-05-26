<div align="center">
    <img src="https://github.com/user-attachments/assets/75ccacba-0dbc-4caf-ab9c-ffd2961f8beb" width="200" alt="logo">
</div>

![GitHub Repo stars](https://img.shields.io/github/stars/halilfurkankarademir/folder-wizard?style=social)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Electron%20%2B%20React-blue)

# Folder Wizard 🧙‍♂️

Folder Wizard is an AI-powered desktop app that helps you clean and organize your files with ease. It scans your folders, understands file types and patterns, and suggests a smart structure to keep everything tidy. Powered by AI and built with Electron, it offers a fast, modern, and multilingual experience — perfect for anyone who wants a clutter-free workspace.

👉 [**Try it now**](https://github.com/halilfurkankarademir/folder-wizard/releases) — Download the latest release

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/6e97904b-7a6d-4598-b70d-47513ba77947" width="500" />
  <img src="https://github.com/user-attachments/assets/3b97970b-0ef8-47d3-90e0-d55d021892b3" width="500" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/63ca766f-a8c4-4c9d-b8a4-8da31e6430c9" width="500" />
  <img src="https://github.com/user-attachments/assets/e38d9d89-5169-4adb-b6d3-584a2febc0a8" width="500" />
</p>

## ✨ Features

-   🤖 AI-powered file organization suggestions
-   🌐 Multi-language support (English/Turkish)
-   🎨 Modern dark theme interface
-   📁 Smart folder and file analysis
-   🚀 Quick and efficient file organization

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm
-   Git

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/halilfurkankarademir/folder-wizard.git
    cd folder-wizard
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Development Server

Start the development server (runs Vite and Electron concurrently):

```bash
npm run electron:dev
```

### Build for Production

Build the application for production:

```bash
npm run electron:build
```

This command uses `electron-builder` to package the application. The output is typically found in the `release` directory.

## 🧪 Usage

![folderwizard](https://github.com/user-attachments/assets/8914e8bd-c544-45b1-a74a-160922ca5454)

1.  **Select Folder**: Choose the folder you want to organize.
2.  **AI Analysis**: The application analyzes your files using AI.
3.  **Review Suggestions**: Review the suggested organization structure.
4.  **Apply Changes**: Apply the organization with a single click.

## 📦 Project Structure

```
folder-wizard/
├── src/
│   ├── assets/         # Assets (images etc.)
│   ├── components/     # React components
│   ├── config/         # Configurations
│   ├── context/        # React context
│   └── electron/       # Electron main process (e.g., main.cjs)
│   └── hooks/          # Custom React Hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── utils/          # Utility functions
|
├── public/             # Static files for the renderer process
├── release/            # Output directory for packaged application
├── dist/               # Output directory for Vite build (renderer)
├── package.json        # Project metadata and dependencies
├── electron-builder.json5 # electron-builder configuration
├── vite.config.mjs     # Vite configuration
└── README.md
```

## ⚙️ Configuration

### Environment Variables

This project may require certain configuration settings to be stored in an environment file. Create a `.env` file in the root of your project by copying the `.env.example` file (if one is provided) or by creating it manually.

Example `.env` structure:

```
NODE_ENV = development
VITE_NODE_ENV = development
```

**Important:** Ensure that your `.env` file is listed in your `.gitignore` file to prevent sensitive information from being committed to version control.

## 🛠️ Built With

-   [React](https://reactjs.org/) - Frontend framework
-   [Electron](https://www.electronjs.org/) - Desktop application framework
-   [Tailwind CSS](https://tailwindcss.com/) - Styling
-   [i18next](https://www.i18next.com/) - Internationalization
-   `@google/genai` - For AI capabilities

(For a more detailed list of all packages, please refer to the `package.json` file.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 🙏 Acknowledgments

-   [Google Gemini AI](https://deepmind.google/technologies/gemini/) for providing the AI capabilities.
-   [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icons.
-   All contributors who have helped shape this project.

## 📞 Contact

📬 LinkedIn - [@halilfurkankarademir](https://www.linkedin.com/in/halilfurkankarademir/)

Project Link: [folder-wizard](https://github.com/halilfurkankarademir/folder-wizard)

Made with ❤️ by [Halil Furkan Karademir](https://www.linkedin.com/in/halilfurkankarademir/)
