import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    List: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  AddContent = event => {
    event.preventDefault()
    const {website, password, username} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      List: [...prevState.List, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {List} = this.state
    const newList = List.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({List: newList, isTrue: caseOf})
  }

  render() {
    const {website, password, username, List, searchInput, isShow} = this.state
    let {isTrue} = this.state
    const newList = List.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="sub-div1">
          <form className="form-container" onSubmit={this.AddContent}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icons"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icons"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
                className="icons"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="addButton" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="sub-div2">
          <div className="container">
            <div className="passwordCount-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="count">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="searchIcon"
              />
              <input
                type="search"
                className="searchInput"
                placeholder="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>

          <hr className="line" />
          <div className="showPasswords">
            <input
              type="checkbox"
              className="checkbox"
              id="check"
              alt="checkbox"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="show-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="noPassword-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="NoPasswords"
                alt="no passwords"
              />
              <p className="heading">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container" type="none">
              {newList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="details">
                    <p className="values">{eachValue.websiteName}</p>
                    <p className="values">{eachValue.userName}</p>
                    {isShow ? (
                      <p className="values">{eachValue.Password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars"
                        alt="stars"
                      />
                    )}
                  </div>

                  <button
                    className="delBtn"
                    type="button"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delImg"
                      alt="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
