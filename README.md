# ProseMirror Autocomplete Editor

This project is a full-stack application using [ProseMirror](https://prosemirror.net/) to create a text editor with custom autocomplete functionality for hashtags, mentions, and related ideas. It is designed to behave like a typical text input box but with enhanced features for autocomplete. The project is deployed on AWS Amplify and integrates a backend for serving fake autocomplete data.

## Features

- **Text Input with Autocomplete**: Supports autocomplete for:
  - `#` hashtags
  - `@` mentions
  - `<>` related ideas
- **Dynamic Suggestions**: Autocomplete suggestions appear dynamically based on user input.
- **Keyboard Navigation**: Navigate through suggestions using arrow keys and select with `Enter` or `Tab`.
- **Non-Editable Entries**: Autocompleted entries are inserted as non-editable elements.
- **Multiple Autocompletes**: Supports simultaneous autocompletes within the same text input.

## Project Structure

```
prosemirror-autocomplete/
│
├── src/
│   ├── components/
│   │   └── Editor.js             # ProseMirror editor component with autocomplete functionality
│   ├── plugins/
│   │   └── autocompletePlugin.js # Custom plugin to handle autocomplete logic
│   ├── data/
│   │   └── fakeData.js           # Fake data for autocomplete suggestions
│   ├── App.js                    # Main React component for the app
│   ├── App.css                   # Styles specific to the App component
│   ├── index.js                  # Entry point for the React app
│   ├── index.css                 # Global styles for the app
│   └── reportWebVitals.js        # Optional performance monitoring
│
├── amplify/                      # AWS Amplify configuration
├── .gitignore                    # Files and directories to be ignored by Git
├── README.md                     # Project documentation
├── package.json                  # Project dependencies and scripts
└── package-lock.json             # Locked versions of dependencies
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- AWS CLI and Amplify CLI (for deployment)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/prosemirror-autocomplete.git
   cd prosemirror-autocomplete
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```
   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deployment

1. **Initialize AWS Amplify**:
   ```bash
   amplify init
   ```

2. **Deploy the app**:
   ```bash
   amplify add hosting
   amplify publish
   ```

3. **Set up the backend**:
   Configure a Lambda function or any backend service to provide fake data for autocomplete suggestions.

## Customizing the Editor

### Adding New Autocomplete Triggers

To add new triggers, modify the `autocompletePlugin.js` file and update the logic for detecting new patterns.

### Customizing Styles

You can customize the editor styles by modifying the `App.css` file or creating additional CSS files as needed.

## Troubleshooting

- **Autocomplete Suggestions Not Showing**: Check if the `fakeData.js` file has the correct format and if the plugin is correctly integrated with the editor.
- **Keyboard Navigation Issues**: Verify the key event handlers in the `autocompletePlugin.js` file and ensure there are no conflicts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact us at:
- careers@ideapad.io
- jacob@ideapad.io
