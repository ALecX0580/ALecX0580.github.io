document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.gameplay__extra-container');

  // Handle tile clicks with event delegation
  container.addEventListener('click', (e) => {
    // Find clicked tile element
    const clickedTile = e.target.closest('.gameplay__extra');
    if (!clickedTile) return;

    // If clicked tile is already selected, reset all tiles
    if (clickedTile.classList.contains('selected')) {
    container.querySelectorAll('.gameplay__extra').forEach(tile => {
        tile.classList.remove('selected', 'shrunk');
      });
      return;
    }

    // Otherwise, select clicked tile and shrink others
    container.querySelectorAll('.gameplay__extra').forEach(tile => {
      tile.classList.remove('selected', 'shrunk');
    });
    clickedTile.classList.add('selected');
    container.querySelectorAll('.gameplay__extra').forEach(tile => {
      if (tile !== clickedTile) tile.classList.add('shrunk');
    });
  });
});
