// lettergenscript.js

document.addEventListener('DOMContentLoaded', () => {
  // Grab all necessary DOM elements
  const form = document.getElementById('dispute-form');
  const generateButton = document.getElementById('generate-button');
  const responseElement = document.getElementById('response');
  const editorContainer = document.getElementById('editor-container');
  const quillEditorDiv = document.getElementById('quill-editor');
  const saveEditButton = document.getElementById('save-edit-button');

  // Initialize Quill editor with the 'snow' theme
  const quill = new Quill('#quill-editor', {
    theme: 'snow'
  });

  // Check if all elements are present
  if (!form || !generateButton || !responseElement || !editorContainer || !quillEditorDiv || !saveEditButton) {
    console.error('One or more required DOM elements are missing.');
    return;
  }

  // Event listener for the Generate Letter button
  generateButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // Disable the button to prevent multiple submissions
    generateButton.disabled = true;
    responseElement.innerText = 'Generating letter, please wait...';
    quill.setText(''); // Clear previous content
    editorContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to editor

    const formData = new FormData(form);

    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:8000/generate-letter/', {
        method: 'POST',
        body: formData
      });

      // Check if response is OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const data = await response.json();
      const letter = data.letter;

      // Update response message
      responseElement.innerText = 'Letter generated successfully. You can now edit it above.';

      // Load the generated letter into Quill editor
      quill.setText(letter);
      // Alternatively, if the letter contains HTML formatting, use:
      // quill.setContents(quill.clipboard.convert(letter));

    } catch (error) {
      console.error('Error generating letter:', error);
      responseElement.innerText = `Error generating letter: ${error.message}`;
    } finally {
      // Re-enable the button
      generateButton.disabled = false;
    }
  });

  // Event listener for the Save Edit button
  saveEditButton.addEventListener('click', async () => {
    // Get the edited content from Quill (in HTML format)
    const editedContent = quill.root.innerHTML;

    // Optional: Validate the edited content before sending

    try {
      // Disable the button to prevent multiple submissions
      saveEditButton.disabled = true;
      responseElement.innerText = 'Saving edits, please wait...';

      // Send the edited content to the backend to generate a PDF or perform other actions
      const response = await fetch('http://localhost:8000/generate-pdf/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ letter: editedContent })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      // Assuming the backend returns a PDF, you can trigger a download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited_letter.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      responseElement.innerText = 'Edits saved and PDF generated successfully.';
    } catch (error) {
      console.error('Error saving edits:', error);
      responseElement.innerText = `Error saving edits: ${error.message}`;
    } finally {
      // Re-enable the button
      saveEditButton.disabled = false;
    }
  });
});
