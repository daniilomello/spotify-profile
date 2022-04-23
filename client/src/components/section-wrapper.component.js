import { Link } from 'react-router-dom';
import { StyledSection } from '../styles';

const SectionWrapper = ({ children, title, seeAllLink, breadcrumb }) => {
  return (
    <StyledSection>
      <div className='section__inner'>
        <div className='section__top'>
          <h2 className='section__heading'>
            {breadcrumb && (
              <span className='section__breadcrumb'>
                <Link to='/'>Perfil</Link>
              </span>
            )}
            {title && (
              <>
                {seeAllLink ? (
                  <Link to={seeAllLink}>{title}</Link>
                ) : (
                  <span>{title}</span>
                )}
              </>
            )}
          </h2>
          {seeAllLink && (
            <Link to={seeAllLink} className='section__see-all'>
              Ver todos
            </Link>
          )}
        </div>

        {children}
      </div>
    </StyledSection>
  );
};

export default SectionWrapper;
