import React from "react"

const defaultContext = {
  context: {
    banner: "brand",
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContext)

class ApplicationContext extends React.Component {
  constructor() {
    super()
    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContext,
      set: this.setData,
    }
  }

  setData(newData) {
    this.setState(state => ({
      context: {
        ...state.context,
        ...newData,
      },
    }))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer as default, ApplicationContext }
