const form = document.getElementById('dispute-form');
const generateButton = document.getElementById('generate-button');
const responseElement = document.getElementById('response');

generateButton.addEventListener('click', async (event) => {
  event.preventDefault();

  responseElement.innerText = 'Generating letter, please wait...';

  const formData = new FormData(form);

  // Fetch request to the backend
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
    const generatedLetterDiv = document.getElementById('generated-letter');
    generatedLetterDiv.innerText = letter;

  } catch (error) {
    console.error('Error generating letter:', error);
    responseElement.innerText = 'Error generating letter. Please try again later.';
  }
});
