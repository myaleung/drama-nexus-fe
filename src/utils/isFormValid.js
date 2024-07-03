export const isFormValid = (props) => {
  let messages = [];
  let charRegex = /^[a-zA-Z]+$/;

  if (props.path === "/sign-up") {
    if (props.firstName === "") {
      messages.push("Please enter your first name.");
    }

    if (!charRegex.test(props.firstName)) {
      messages.push("First name must contain only letters.");
    }

    if (!charRegex.test(props.lastName)) {
      messages.push("Last name must contain only letters.");
    }
  }

  if (props.path === "/login" || props.path === "/sign-up") {
    if (props.emailAddress === "") {
      messages.push("Please enter your email.");
    }
    if (props.password === "") {
      messages.push("Please enter your password.");
    }
  }

  if (/\/members\/[^\/]+\/edit/.test(props.path)) {
    if (props.oldPassword === "") {
      messages.push("Please enter your current password to confirm changes.");
    }

    if (props.newPassword && props.newPassword.trim() !== "") { 
      if (props.confirmPassword.trim() === "") {
        messages.push("Please confirm your new password.");
      }
    }

    if (props.newPassword !== props.confirmPassword) {
      messages.push("Your new passwords aren't identical.");
    }
  }

  if (props.path === "add-review" || props.path === "edit-review") {
    if (props.title === "") {
      messages.push("Please enter a review title.");
    }
  }

  return messages;
};