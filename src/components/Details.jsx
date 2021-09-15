import React from 'react';

import jobDetailsImg from '../job-details.svg';

const Details = ({
  details,
  detailsType,
}) => {
  // Sort skills by weight in descending order and take first five
  const formatSkills = skills => skills
    .sort((first, second) => second.weight - first.weight)
    .slice(0, 5)
    .map(skill => (
      <li key={skill.name}>
        <a href={`/people?query=${skill.name.toLowerCase()}`}>
          {skill.name}
        </a>
      </li>
    ));

  const jobDetailsJsx = () => {
    if (detailsType !== 'job') return '';

    return details.id === undefined
      ? (
        <div className="static-img">
          <img src={jobDetailsImg} alt="" />
          <h3>Click on an item to view details</h3>
        </div>
      )
      : (
        <>
          <header>
            <div className="profile">
              <div className="img">
                {details.organizations[0] ? (<img src={details.organizations[0].picture} alt="company" />) : ''}
              </div>

              <div>
                <h1>{details.organizations[0] ? details.organizations[0].name : ''}</h1>
                {details.place.location.length > 0
                  ? (
                    <p>{details.place.location.map(location => `${location.id}, `)}</p>
                  ) : ''}
              </div>
            </div>

            <h4>{details.objective}</h4>
          </header>

          {
            details.details.map(detail => (
              <div className="info" key={Math.random()}>
                <h4>{detail.code}</h4>
                {detail.content.split('\n').map(text => (
                  <p key={Math.random()}>{text}</p>
                ))}
              </div>
            ))
          }

          <div className="action-btn">
            <a href={`https://torre.co/jobs/${details.id}`} rel="noreferrer" target="_blank" className="apply-btn">Apply Now</a>
            <a href={`https://torre.co/jobs/${details.id}`} rel="noreferrer" target="_blank" className="details-btn">Full Page</a>
          </div>
        </>
      );
  };

  const peopleDetailsJsx = () => {
    if (detailsType !== 'people') return '';

    return details.person === undefined
      ? (
        <div className="static-img">
          <img src={jobDetailsImg} alt="" />
          <h3>Click on an item to view details</h3>
        </div>
      )
      : (
        <div className="people">
          <header>
            <div className="profile">
              <div className="img">
                {details.person.picture ? (<img src={details.person.picture} alt="company" />) : (<img src="https://user-images.githubusercontent.com/57726348/104851251-f71f2500-5919-11eb-907b-1fd77e6f7bb7.png" alt="logo" />)}
              </div>

              <div>
                <h1>{details.person.name}</h1>
                <p>
                  <i className="fas fa-briefcase" />
                  {' '}
                  {details.person.professionalHeadline.length > 20 ? `${details.person.professionalHeadline.slice(0, 20)}...` : details.person.professionalHeadline}
                </p>
                <p>
                  <i className="fas fa-map-marker-alt" />
                  {' '}
                  {details.person.location.name}
                </p>
              </div>
            </div>

            <div className="links">
              {details.person.links.map(link => {
                if (link.name === 'linkedin') {
                  return (
                    <a href={link.address} style={{ color: '#0e76a8' }} rel="noreferrer" target="_blank">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  );
                }
                if (link.name === 'github') {
                  return (
                    <a href={link.address} style={{ color: '#24292e' }} rel="noreferrer" target="_blank">
                      <i className="fab fa-github" />
                    </a>
                  );
                }
                if (link.name === 'twitter') {
                  return (
                    <a href={link.address} style={{ color: '#1DA1F2' }} rel="noreferrer" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  );
                }
                if (link.name === '') {
                  return (
                    <a href={link.address} style={{ color: '#6F32FF' }} rel="noreferrer" target="_blank">
                      <i className="fas fa-globe" />
                    </a>
                  );
                }

                return '';
              })}
            </div>
          </header>

          <h2>Skills</h2>
          <div className="skills">
            <ul>
              {formatSkills(details.strengths)}
            </ul>
          </div>

          <h2>About</h2>
          <p>{details.person.summaryOfBio}</p>

          <h2>Experience</h2>
          {
            details.jobs.map(job => (
              <div className="profile company" key={job.id}>
                <div className="img">
                  {job.organizations[0] ? (<img src={job.organizations[0].picture} alt="company" />) : (<img src="https://user-images.githubusercontent.com/57726348/104851251-f71f2500-5919-11eb-907b-1fd77e6f7bb7.png" alt="logo" />)}
                </div>

                <div>
                  <h4>{job.name}</h4>
                  <p>{job.organizations[0] ? job.organizations[0].name : ''}</p>
                  <p>
                    {`${job.fromMonth}, ${job.fromYear}${job.toMonth && job.toYear ? ` - ${job.toMonth}, ${job.toYear}` : ' - Current'}`}
                  </p>
                </div>
              </div>
            ))
          }

          <h2>Education</h2>
          {
            details.education.map(item => (
              <div className="profile company" key={item.id}>
                <div className="img">
                  {item.organizations[0] ? (<img src={item.organizations[0].picture} alt="institution" />) : (<img src="https://user-images.githubusercontent.com/57726348/104851251-f71f2500-5919-11eb-907b-1fd77e6f7bb7.png" alt="logo" />)}
                </div>

                <div>
                  <h4>{item.name}</h4>
                  <p>{item.organizations[0] ? item.organizations[0].name : ''}</p>
                  <p>
                    {`${item.fromMonth}, ${item.fromYear}${item.toMonth && item.toYear ? ` - ${item.toMonth}, ${item.toYear}` : ' - Current'}`}
                  </p>
                </div>
              </div>
            ))
          }

          <div className="action-btn">
            <a href={`https://bio.torre.co/${details.person.publicId}`} rel="noreferrer" target="_blank" className="apply-btn">Contact</a>
          </div>
        </div>
      );
  };

  return (
    <section className="details">
      {detailsType === 'job' ? jobDetailsJsx() : peopleDetailsJsx()}
    </section>
  );
};

export default Details;
