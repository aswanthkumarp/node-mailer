# Nodemailer Email Sending Project

This is a Node.js project that demonstrates how to use Nodemailer to send emails, fetch user data from an HTML form, and redirect to a success page. The project also includes Bootstrap for styling the HTML pages.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.

## Configuration with .env File

Before you start using this project, you'll need to configure your SMTP email service and credentials by creating a `.env` file in the project root directory. Below are the variables you need to define in the `.env` file:

- `SMTP_SERVICE`: Your SMTP service provider (e.g., 'Gmail', 'Yahoo', 'Outlook').
- `SMTP_USER`: Your SMTP email address.
- `SMTP_PASS`: Your SMTP email password or an [app password](https://support.google.com/accounts/answer/185833?hl=en) for Gmail.

Here's an example `.env` file:

```env
SMTP_SERVICE=gmail
SMTP_USER=your-smtp-email@gmail.com
SMTP_PASS=your-smtp-email-password-or-app-password
