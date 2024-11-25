class LogPanel extends HTMLElement {

    isVisible = false;

    constructor() {

        super();

        // Attach a shadow DOM to the element
        this.attachShadow({ mode: 'open' });

        // Creating the layout structure for the sidebar
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        this.container.style.zIndex = '1000';
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.transform = 'translate(-340px)';
        this.container.style.transition = 'all 0.3s';

        this.sidebar = document.createElement('div');
        this.toggleButton = document.createElement('button');
        this.clearButton = document.createElement('button');
        this.messagesContainer = document.createElement('pre');

        this.container.append(this.sidebar, this.toggleButton, this.clearButton);
        this.sidebar.appendChild(this.messagesContainer);

        // Button to toggle sidebar
        this.toggleButton.textContent = '☰';
        this.toggleButton.style.position = 'absolute';
        this.toggleButton.style.top = '20px';
        this.toggleButton.style.right = '-40px';
        this.toggleButton.style.cursor = 'pointer';
        this.toggleButton.addEventListener('click', () => this.toggleSidebar());

        // Reset button to toggle sidebar
        this.clearButton.textContent = 'x';
        this.clearButton.style.position = 'absolute';
        this.clearButton.style.top = '20px';
        this.clearButton.style.right = '20px';
        this.clearButton.style.cursor = 'pointer';
        this.clearButton.addEventListener('click', () => this.clearMessages());

        // Sidebar styles
        this.sidebar.style.width = '300px';
        this.sidebar.style.height = '100vh';
        this.sidebar.style.backgroundColor = '#333';
        this.sidebar.style.color = 'white';
        this.sidebar.style.transition = 'left 0.3s ease';
        this.sidebar.style.padding = '20px';
        this.sidebar.style.overflowY = 'auto';

        // Messages container
        this.messagesContainer.style.marginTop = '40px';
        this.messagesContainer.style.maxHeight = '90%';
        this.messagesContainer.style.overflowY = 'auto';

        // Append elements to shadow DOM
        this.shadowRoot.append(this.container);

        // Hook into console.log
        this.originalConsoleLog = console.log;
        console.log = (...args) => {
            this.originalConsoleLog(...args);
            const validArgs = args.map((arg) => {
                return typeof arg === "object" ? JSON.stringify(arg) : arg;
            });
            this.addMessageToSidebar(validArgs);
        };

        this.originalConsoleError = console.error;
        console.error = (...args) => {
            this.originalConsoleError(...args);
            const validArgs = args.map((arg) => {
                return typeof arg === "object" ? JSON.stringify(arg) : arg;
            });
            this.addMessageToSidebar(validArgs, true);
        };
    }

    toggleSidebar() {
        this.container.style.transform = this.isVisible ? 'translateX(-340px)' : 'translateX(0)';
        this.isVisible = !this.isVisible;
    }

    clearMessages() {
        this.messagesContainer.innerHTML = '';
    }

    addMessageToSidebar(message, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.style.paddingBottom = '10px';

        if (isError) {
            messageDiv.style.color = "red"
        }

        messageDiv.textContent = message;
        this.messagesContainer.appendChild(messageDiv);
    }
}

// Define the custom element
customElements.define('log-panel', LogPanel);
