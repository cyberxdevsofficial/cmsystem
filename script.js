document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const message = document.getElementById("message");

  if (!name || !comment) {
    message.textContent = "Please fill all fields.";
    message.style.color = "#ff4444";
    return;
  }

  message.textContent = "Sending...";
  message.style.color = "#0ff";

  try {
    const res = await fetch("/api/sendComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, comment }),
    });

    const result = await res.json();
    message.textContent = result.message;
    message.style.color = "#0f0";
    document.getElementById("commentForm").reset();
  } catch (err) {
    console.error(err);
    message.textContent = "Error sending comment.";
    message.style.color = "#ff4444";
  }
});
