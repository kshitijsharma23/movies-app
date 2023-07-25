import { movieCardGap, movieCardWidth } from '@constants/layoutConstants';

export const getMovieDetailsLayout = (
  selectedCardIndex: number,
  containerWidth: number | undefined,
) => {
  if (containerWidth) {
    const numberOfCardsPerRow = Math.floor(
      containerWidth / (movieCardWidth + movieCardGap),
    );

    const selectedCardRow = Math.ceil(
      (selectedCardIndex + 1) / numberOfCardsPerRow,
    );

    const indexToInsert = (selectedCardRow - 1) * numberOfCardsPerRow;
    const maxWidth =
      numberOfCardsPerRow * movieCardWidth +
      (numberOfCardsPerRow - 1) * movieCardGap;

    return { indexToInsert, maxWidth: `${maxWidth}px` };
  }

  return { indexToInsert: 0, maxWidth: '100%' };
};
