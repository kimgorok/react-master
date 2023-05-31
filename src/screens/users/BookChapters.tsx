const chapters = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];

function BookChapters() {
  return (
    <div>
      <h2>Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>Chapter {chapter}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookChapters;
