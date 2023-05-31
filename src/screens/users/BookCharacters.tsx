const character = ["A", "B"];

function BookCharacter() {
  return (
    <div>
      <h2>Characters</h2>
      <ul>
        {character.map((chracter) => (
          <li key={chracter}>Good Guy {chracter}</li>
        ))}
        {character.map((chracter) => (
          <li key={chracter}>Bad Guy {chracter}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookCharacter;
