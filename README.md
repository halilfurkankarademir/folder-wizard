# Folder Wizard 🧙‍♂️

Folder Wizard is an AI-powered desktop application that helps you organize your files intelligently. Using the power of AI, it analyzes your files and suggests the most efficient organization structure.

![image](https://github.com/user-attachments/assets/212df12d-620d-4e6a-9cf5-225a31300310)

## ✨ Features

-   🤖 AI-powered file organization suggestions
-   🌐 Multi-language support (English/Turkish)
-   🎨 Modern dark theme interface
-   📁 Smart folder selection and file analysis
-   🚀 Quick and efficient file organization
-   💻 Cross-platform desktop application

## 🚀 Getting Started

### Environment Variables

This project may require certain configuration settings to be stored in an environment file. Create a `.env` file in the root of your project by copying the `.env.example` file (if one is provided) or by creating it manually.

Example `.env` structure:

```
VITE_NODE_ENV = development
```

**Important:** Ensure that your `.env` file is listed in your `.gitignore` file to prevent sensitive information from being committed to version control.

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

## 🛠️ Built With

-   [React](https://reactjs.org/) - Frontend framework
-   [Electron](https://www.electronjs.org/) - Desktop application framework
-   [Tailwind CSS](https://tailwindcss.com/) - Styling
-   [i18next](https://www.i18next.com/) - Internationalization
-   `@google/genai` - For AI capabilities

(For a more detailed list of all packages, please refer to the `package.json` file.)

## 📦 Project Structure

```
folder-wizard/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── context/        # React context
│   ├── utils/          # Utility functions
│   ├── services/       # API services
│   └── electron/       # Electron main process (e.g., main.cjs)
├── public/             # Static files for the renderer process
├── release/            # Output directory for packaged application
├── dist/               # Output directory for Vite build (renderer)
├── package.json        # Project metadata and dependencies
├── electron-builder.json5 # electron-builder configuration
├── vite.config.mjs     # Vite configuration
└── README.md
```

## 🎯 How It Works

1.  **Select Folder**: Choose the folder you want to organize.
2.  **AI Analysis**: The application analyzes your files using AI.
3.  **Review Suggestions**: Review the suggested organization structure.
4.  **Apply Changes**: Apply the organization with a single click.

## 🔧 Configuration

The application can be configured through the settings page:

-   Language preferences
-   Theme settings
-   Organization rules
-   AI settings

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

Linkedin - [@halilfurkankarademir](https://www.linkedin.com/in/halilfurkankarademir/)

Project Link: [folder-wizard](https://github.com/halilfurkankarademir/folder-wizard)

Made with ❤️ by Halil Furkan Karademir
