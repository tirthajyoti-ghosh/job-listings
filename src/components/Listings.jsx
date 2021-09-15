import React from 'react';
import queryString from 'query-string';

import jobSearchImg from '../job-search.svg';

const Listings = ({
  searchResults,
  searchType,
  location,
  getDetails,
}) => {
  const searchParams = queryString.parse(location.search);

  const formatLocations = (remote, locations) => {
    if (remote) {
      if (locations.length === 0) {
        return 'Remote';
      }
      return `Remote - ${locations.join('; ')}`;
    }
    return locations.join('; ');
  };

  // Sort skills by weight in descending order and take first 3
  const formatSkills = skills => skills
    .sort((first, second) => second.weight - first.weight)
    .slice(0, 3)
    .map(skill => (
      <li key={skill.name}>
        <a href={`/people?query=${skill.name.toLowerCase()}`}>
          {skill.name.length > 12 ? `${skill.name.slice(0, 15)}...` : skill.name}
        </a>
      </li>
    ));

  const formatJobCompensation = compensation => {
    if (compensation === null || compensation.data === null) {
      return 'Not available';
    }
    return `${compensation.data.currency} ${compensation.data.minAmount} - ${compensation.data.maxAmount} /${compensation.data.periodicity}`;
  };

  const formatPeopleCompensations = compensations => {
    if (compensations.freelancer) {
      return `${compensations.freelancer.currency} ${compensations.freelancer.amount}/${compensations.freelancer.periodicity}`;
    }

    if (compensations.intern) {
      return `${compensations.intern.currency} ${compensations.intern.amount}/${compensations.intern.periodicity}`;
    }

    if (compensations.employee) {
      return `${compensations.employee.currency} ${compensations.employee.amount}/${compensations.employee.periodicity}`;
    }

    return 'Not available';
  };

  const jobSearchResultsJsx = () => {
    if (searchType !== 'job') return '';

    return !searchResults.result
      ? (
        <div className="static-img">
          <h2>Let&apos;s get started!</h2>
          <img src={jobSearchImg} alt="" />
        </div>
      )
      : (
        <section className="listings">
          {searchResults.result.map(job => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className={`card ${searchParams.jobId && searchParams.jobId === job.id ? 'active' : ''}`} key={job.id} role="menuitem" tabIndex={0} onClick={() => getDetails(job.id)}>
              <div className="profile">
                <div className="img">
                  {job.organizations[0] ? (<img src={job.organizations[0].picture} alt="company" />) : (<img src="https://user-images.githubusercontent.com/57726348/104851251-f71f2500-5919-11eb-907b-1fd77e6f7bb7.png" alt="logo" />)}
                </div>

                <div className="info">
                  <h3>{job.objective.length > 30 ? `${job.objective.slice(0, 30)}...` : job.objective}</h3>
                  <p>{job.organizations[0] ? job.organizations[0].name : ''}</p>
                </div>
              </div>
              <div>
                <h3>{formatLocations(job.remote, job.locations)}</h3>
                <p>Location</p>
              </div>
              <div>
                <h3>{formatJobCompensation(job.compensation)}</h3>
                <p>Salary</p>
              </div>
            </div>
          ))}
        </section>
      );
  };

  const peopleSearchResultsJsx = () => {
    if (searchType !== 'people') return '';

    return !searchResults.result
      ? (
        <div className="static-img">
          <h2>Let&apos;s get started!</h2>
          <img src={jobSearchImg} alt="" />
        </div>
      )
      : (
        <section className="listings">
          {searchResults.result.map(people => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className={`card people ${searchParams.username && searchParams.username === people.username ? 'active' : ''}`} key={people.username} role="menuitem" tabIndex={0} onClick={() => getDetails(people.username)}>
              <div className="profile">
                <div className="img">
                  {people.picture ? (<img src={people.picture} alt={people.name} />) : (<img src="https://user-images.githubusercontent.com/57726348/104851251-f71f2500-5919-11eb-907b-1fd77e6f7bb7.png" alt="logo" />)}
                </div>

                <div className="info">
                  <h3>{people.name.length > 30 ? `${people.name.slice(0, 30)}...` : people.name}</h3>
                  <p>{people.professionalHeadline.length > 30 ? `${people.professionalHeadline.slice(0, 30)}...` : people.professionalHeadline}</p>
                </div>
              </div>
              <div>
                <div className="skills">
                  <ul>
                    {formatSkills(people.skills)}
                  </ul>
                </div>
              </div>
              <div>
                <h3>{formatPeopleCompensations(people.compensations)}</h3>
                <p>Compensations</p>
              </div>
            </div>
          ))}
        </section>
      );
  };

  return searchType === 'job' ? jobSearchResultsJsx() : peopleSearchResultsJsx();
};

export default Listings;
