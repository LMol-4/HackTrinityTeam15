// lettergenscript.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dispute-form');
  const generateButton = document.getElementById('generate-button');
  const responseElement = document.getElementById('response');
  const generatedLetterDiv = document.getElementById('generated-letter');

  if (!form || !generateButton || !responseElement || !generatedLetterDiv) {
    console.error('One or more required DOM elements are missing.');
    return;
  }

  generateButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // Disable the button to prevent multiple submissions
    generateButton.disabled = true;
    responseElement.innerText = 'Generating letter, please wait...';
    generatedLetterDiv.innerText = ''; // Clear previous letter

    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:8000/generate-letter/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const data = await response.json();
      const letter = data.letter;

      responseElement.innerText = 'Letter generated successfully.';

      // Display the generated letter in the "Generated Letter" section
      generatedLetterDiv.innerText = letter;

    } catch (error) {
      console.error('Error generating letter:', error);
      responseElement.innerText = `Error generating letter: ${error.message}`;
    } finally {
      // Re-enable the button
      generateButton.disabled = false;
    }
  });
});
