import React from "react";
import PropTypes, { func } from "prop-types";
import { fetchPopularRepos } from "./utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
function Nav(props) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="nav-link btn-clear"
            onClick={props.changeSelectedLanguage.bind(null, language)}
            style={
              language === props.selectedLanguage
                ? { color: `rgb(186,41,32)` }
                : null
            }
          >
            {language}
          </button>
        </li>
      ))}
      {/* <li>{props.selectedLanguage}</li> */}
    </ul>
  );
}

Nav.propTypes = {
  changeSelectedLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid">
      {repos.map((repo, index) => {
        const { name, html_url, owner, stargazers_count, forks, open_issues } =
          repo;
        const { login, avatar_url } = owner;
        return (
          <li key={html_url} className="repo bg-light">
            <h4 className="header-lg center-text">#{index + 1}</h4>
            <img
              src={avatar_url}
              className="avatar"
              alt={`Avatar for ${login}`}
            />
            <h2 className="center-text">
              <a className="link" href={html_url}>
                {login}
              </a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color="rgb(255,191,116)" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color="rgb(255,215,0)" size={22} />
                {stargazers_count.toLocaleString()} satrs
              </li>
              <li>
                <FaCodeBranch color="rgb(129,195,245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241,138,0)" size={22} />
                {open_issues.toLocaleString()} issues
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.changeSelectedLanguage = this.changeSelectedLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.state = {
      selectedLanguage: "All",
      errors: null,
      repos: {},
    };
  }
  componentDidMount() {
    this.changeSelectedLanguage(this.state.selectedLanguage);
  }

  isLoading() {
    const { selectedLanguage, repos, errors } = this.state;
    return errors === null && !repos[selectedLanguage];
  }

  changeSelectedLanguage(language) {
    this.setState({ selectedLanguage: language });
    if (!this.state.repos[language]) {
      fetchPopularRepos(language)
        .then((data) => {
          this.setState(({ repos }) => {
            return {
              repos: {
                ...repos,
                [language]: data,
              },
            };
          });
        })
        .catch((error) => {
          console.warn("Error in fetching repo:", error);
          this.setState({
            error: "there was some problem in fetching the repositories.",
          });
        });
    }
  }
  render() {
    return (
      <>
        {" "}
        <Nav
          changeSelectedLanguage={this.changeSelectedLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
        {this.isLoading() && <p>Loading</p>}
        {this.state.errors && <p>this.state.errors</p>}
        {this.state.repos[this.state.selectedLanguage] && (
          <ReposGrid repos={this.state.repos[this.state.selectedLanguage]} />
        )}
      </>
    );
  }
}
