export const ratingColour = (rating) => { 
  if (rating >= 8) {
    return "text-green-500";
  } else if (rating >= 5) {
    return "text-yellow-500";
  } else {
    return "text-mauve-light";
  }
};