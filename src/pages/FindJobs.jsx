import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import Search from '../components/Search';
import queryApi from '../helpers/apiUtilities';
import updateLoadingState from '../store/actions/loadingState';
import addJobSearchResults from '../store/actions/jobSearchResults';
import addJobDetails from '../store/actions/jobDetails';
import Loading from '../components/Loading';
import Listings from '../components/Listings';
import Details from '../components/Details';

const FindJobs = ({
  isLoading,
  jobSearchResults,
  jobDetails,
  location,
  dispatchUpdateLoadingState,
  dispatchAddJobSearchResults,
  dispatchAddJobDetails,
}) => {
  const searchParams = queryString.parse(location.search);
  const history = useHistory();

  const initiateSearch = query => {
    dispatchUpdateLoadingState(true);

    queryApi.post(0, 'opportunities', { 'skill/role': { text: query, experience: 'potential-to-develop' } })
      .then(result => {
        dispatchAddJobSearchResults({ result: result.results, total: result.total });

        if (searchParams.query !== query) {
          if (searchParams.jobId) {
            history.push(`?query=${query}&jobId=${searchParams.jobId}`);
          }

          history.push(`?query=${query}`);
        }

        dispatchUpdateLoadingState(false);
      });
  };

  const getDetails = jobId => {
    dispatchUpdateLoadingState(true);

    queryApi.get(`https://ghosh-cors-anywhere.herokuapp.com/https://torre.co/api/suite/opportunities/${jobId}`)
      .then(result => {
        dispatchAddJobDetails(result);
        history.push(`?query=${searchParams.query}&jobId=${jobId}`);
        dispatchUpdateLoadingState(false);
      });
  };

  useEffect(() => {
    if (searchParams.query !== undefined) {
      initiateSearch(searchParams.query);
    }

    if (searchParams.jobId !== undefined) {
      getDetails(searchParams.jobId);
    }
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : ''}

      <Search initiateSearch={initiateSearch} type="jobs" defaultValue={searchParams.query ? searchParams.query : ''} total={jobSearchResults.total} />

      <Listings searchResults={jobSearchResults} searchType="job" getDetails={getDetails} location={location} />

      <Details details={jobDetails} detailsType="job" />
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  jobSearchResults: state.jobSearchResults,
  jobDetails: state.jobDetails,
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLoadingState: value => dispatch(updateLoadingState(value)),
  dispatchAddJobSearchResults: value => dispatch(addJobSearchResults(value)),
  dispatchAddJobDetails: value => dispatch(addJobDetails(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindJobs);
