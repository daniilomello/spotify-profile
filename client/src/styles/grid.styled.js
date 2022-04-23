import styled from 'styled-components/macro';

const StyledGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: var(--spacing-sm);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: var(--spacing-lg);
  }

  .grid__item {
    background-color: var(--near-black);
    border-radius: var(--border-radius-subtle);
    transition: background-color 0.3s ease;
    padding: var(--spacing-lg);
    cursor: default;

    &:hover,
    &:focus {
      background-color: var(--dark-gray);
      img {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }

  .grid__item__image {
    position: relative;
    padding-top: 100%;
    margin: 0 auto var(--spacing-lg);

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: var(--dark-gray);
      border-radius: ${(props) => (props.type === 'artist' ? '50%' : '2px')};
    }
  }

  .grid__item__name {
    margin: var(--spacing-md) 0 var(--spacing-xxs);
    font-size: var(--fz-md);
    letter-spacing: normal;
  }

  .grid__item__label {
    font-size: var(--fz-sm);
    color: var(--light-gray);
  }
`;

export default StyledGrid;
