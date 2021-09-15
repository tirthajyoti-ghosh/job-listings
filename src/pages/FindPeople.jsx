import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import Search from '../components/Search';
import queryApi from '../helpers/apiUtilities';
import updateLoadingState from '../store/actions/loadingState';
import addPeopleSearchResults from '../store/actions/peopleSearchResults';
import addPeopleDetails from '../store/actions/peopleDetails';
import Loading from '../components/Loading';
import Listings from '../components/Listings';
import Details from '../components/Details';

const FindPeople = ({
  isLoading,
  peopleSearchResults,
  peopleDetails,
  location,
  dispatchUpdateLoadingState,
  dispatchAddPeopleSearchResults,
  dispatchAddPeopleDetails,
}) => {
  const searchParams = queryString.parse(location.search);
  const history = useHistory();

  const initiateSearch = query => {
    dispatchUpdateLoadingState(true);

    queryApi.post(0, 'people', { 'skill/role': { text: query, experience: '1-plus-year' } })
      .then(result => {
        dispatchAddPeopleSearchResults({ result: result.results, total: result.total });

        if (searchParams.query !== query) {
          if (searchParams.username) {
            history.push(`/people?query=${query}&username=${searchParams.username}`);
          }

          history.push(`/people?query=${query}`);
        }

        dispatchUpdateLoadingState(false);
      });
  };

  const getDetails = username => {
    dispatchUpdateLoadingState(true);

    queryApi.get(`https://ghosh-cors-anywhere.herokuapp.com/https://torre.bio/api/bios/${username}`)
      .then(result => {
        dispatchAddPeopleDetails(result);
        history.push(`/people?query=${searchParams.query}&username=${username}`);
        dispatchUpdateLoadingState(false);
      });
  };

  useEffect(() => {
    if (searchParams.query !== undefined) {
      initiateSearch(searchParams.query);
    }

    if (searchParams.username !== undefined) {
      getDetails(searchParams.username);
    }
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : ''}

      <Search initiateSearch={initiateSearch} type="people" defaultValue={searchParams.query ? searchParams.query : ''} total={peopleSearchResults.total} />

      <Listings searchResults={peopleSearchResults} searchType="people" getDetails={getDetails} location={location} />

      <Details details={peopleDetails} detailsType="people" />
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  peopleSearchResults: state.peopleSearchResults,
  peopleDetails: state.peopleDetails,
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLoadingState: value => dispatch(updateLoadingState(value)),
  dispatchAddPeopleSearchResults: value => dispatch(addPeopleSearchResults(value)),
  dispatchAddPeopleDetails: value => dispatch(addPeopleDetails(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindPeople);
