
# Log Panel

A lightweight and customizable logging panel implemented as a Web Component. `LogPanel` hooks into `console.log` and `console.error` to display logs and errors directly on your webpage, providing a convenient debugging tool for developers.

## Features

- Displays `console.log` and `console.error` messages in a sidebar.
- Toggle the sidebar visibility using a button.
- Clear messages with a reset button.
- Styled using Shadow DOM to avoid conflicts with your application styles.

## Usage

### Installation

1. Include the script in your HTML file using the following tag:

```html
   <script src="https://smiranin.github.io/log-panel/log-panel.js"></script>
   ```
   
Add the `<log-panel>` component anywhere in your HTML:
```html
<log-panel></log-panel>
```
### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log Panel Example</title>
    <script src="path-to-your/log-panel.js"></script>
</head>
<body>
    <log-panel></log-panel>
    <script>
        console.log('Hello, World!');
        console.error('Something went wrong!');
    </script>
</body>
</html>
```

### Development
Feel free to modify or extend the `LogPanel` class to suit your needs. Contributions are welcome!