# Experimental React Architecture

This repo contains three projects that can be imported as npm packages.

## CDH - Common Data Handler

### Main functionality
* Redux Store creation using redux toolkit.
* Collection handling i.e JS array
* Object handling i.e JS object
* DataSource handling for all type of controls
* Databind handling for all type of controls
* API parser
* Network service

#### Redux store
* Redux store is created in a that it has only 2 slices
  * Object Slice
  * Collection Slice
 
* So, we can only save 2 types of data in redux. Which makes is easy to use and modular.
* This helps us integrate DataSource, Databind and Network handling with redux.

#### Collection Handling
* Collections are meant to handle JS arrays and array related operations in Redux.Like:
  * Fetching collection from API and saving directly in Redux
  * Service and hook to add and modify collection

#### Object Handling
* Objects are meant to handle JS objects and object related operations in Redux.Like:
  * Fetching object from API and saving directly in Redux
  * Service and hook to add and modify object
 
#### DataSource
* DataSource helps provide data to any control in React or React-Native
* Data can we static or from API and can be saved into redux
* There is a service and a hook to handle datasource

#### Databind
* Databind helps to handle onChange events in any React or React-native control.
* Databind also returns value selected by user. This is stored in redux.
* There is a service and a hook to handle databind
* Bound value can generally be updated at root level of an object stored in redux using Object service or hooks, or at root level of an object stored at any index of a Collection using Collection Service or Hooks.

  ##### Complex Databind
  * Complex databind is similar to databind but it can save bound values into nested object or collections using a simple '.' seperated string as fieldName. eg: `'question.option.0.answer'` this can be used to store value at following `{ question: { option: [{ answer: 'bound value will be stored here as 0 will be used as an index' }, { answer: null }] } }`


#### Both React-native apps and React.js web apps can use these features.


## CWC and CMC
### CWC - Common web components
### CMC - Common mobile components (React native)

Both **CWC** and **CMC** use **CDH** under the hood to implement controls for web and mobile respectively.
All controls have integration with Collection and Object slices using hooks or services to implement **Datasource** and **Databind**.

