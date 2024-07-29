# Sauceome

Welcome to the Sauceome Command Executor, the app you never knew you needed and probably still don't. This little gem of a project allows you to create buttons that execute command line commands. Because, why not?

## Features

- Create buttons with custom labels and commands.
- Execute commands with a single click.
- Edit your buttons because who gets things right the first time?
- Delete buttons when you realize you made a terrible mistake.
- Results displayed in a fancy side panel.
- JSON results? We've got a viewer for that.
- All commands are stored in a SQLite database, because we're fancy like that.

## Installation

First, clone this repository because you clearly have nothing better to do:
```sh
git clone https://github.com/ydinkov/Sauceome.git
cd button-command-executor
```

Next, install the necessary dependencies:
```sh
npm install
npm install -g browserify
```

Bundle the JSON viewer:
```sh
browserify public/bundle.js -o public/bundle.js
```

Finally, run the app:
```sh
node index.js
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Behold the magnificence of the Button Command Executor interface.
3. Create a new button by filling out the form and clicking "Add Button".
   - **Button Label**: Give your button a name. "Do Something" is always a solid choice.
   - **Command**: Enter the command you want to run. Maybe something harmless like `echo Hello, World!`.
4. Click your new button and watch in awe as your command executes and the result appears in the side panel.
   - If the result is JSON, enjoy our built-in JSON viewer. If it's not, well, it's plain text. Deal with it.
5. Realize you made a mistake? No problem! Click "Edit" to update the button, or "Delete" to obliterate it from existence.
6. Repeat until you run out of ideas or patience, whichever comes first.

## Disclaimer

- **Security Warning**: This app lets you run arbitrary commands on your server. If you expose this to the world, you're basically handing out free tickets to your personal command line. Proceed with extreme caution and a healthy dose of paranoia.

