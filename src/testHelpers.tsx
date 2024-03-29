import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { testUser1, testPortalUser1 } from './__fixtures__/authUsers'
import { AuthContext, AuthContextType } from 'stores/authContext'
import { ModalContext, ModalContextType } from 'stores/modalContext'
import { SearchContext, SearchContextType } from 'stores/searchContext'
import { MySpaceContext, MySpaceContextType } from 'stores/myspaceContext'
import { Widget } from 'types'

export const defaultMockAuthContext = {
  user: testUser1,
  portalUser: testPortalUser1,
  setUser: jest.fn(),
  setPortalUser: jest.fn(),
  logout: jest.fn(),
  login: jest.fn(),
}

export const defaultMockModalContext = {
  modalId: '',
  updateModalId: jest.fn(),
  modalRef: null,
  modalHeadingText: '',
  closeModal: jest.fn(),
  onDelete: jest.fn(),
  onSave: jest.fn(),
  updateWidget: jest.fn(),
  updateModalText: jest.fn(),
  additionalText: '',
  updateBookmark: jest.fn(),
  customLinkLabel: '',
  updateCustomLinkLabel: jest.fn(),
  showAddWarning: false,
  isAddingLinkContext: false,
}

export const renderWithModalRoot = (
  component: React.ReactElement,
  value: Partial<ModalContextType> = {},
  mocks: readonly MockedResponse<Record<string, unknown>>[] = [],
  authValue: Partial<AuthContextType> = {}
) => {
  const modalContainer = document.createElement('div')
  modalContainer.setAttribute('id', 'modal-root')

  const contextValue = {
    ...defaultMockModalContext,
    ...value,
  }

  const authContextValue = {
    ...defaultMockAuthContext,
    ...authValue,
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <AuthContext.Provider value={authContextValue}>
        <MockedProvider
          mocks={mocks}
          addTypename={false}
          defaultOptions={{
            watchQuery: { fetchPolicy: 'no-cache' },
            query: { fetchPolicy: 'no-cache' },
          }}>
          <ModalContext.Provider value={contextValue}>
            {children}
          </ModalContext.Provider>
        </MockedProvider>
      </AuthContext.Provider>
    )
  }

  return render(component, {
    // ...options,
    container: document.body.appendChild(modalContainer),
    wrapper,
  })
}

/** Renders the component inside of an already-authenticated AuthProvider */
/** You can pass custom auth context values (user, mock functions) as needed */
export const renderWithAuth = (
  component: React.ReactElement,
  value: Partial<AuthContextType> = {}
) => {
  const contextValue = {
    ...defaultMockAuthContext,
    ...value,
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )

  return render(component, { wrapper })
}

/** Renders the component inside of an already-authenticated AuthProvider and a MockedProvider*/
/** You can pass custom auth context values (user, mock functions) as needed */
/** You can pass graphql mocks as needed */
export const renderWithAuthAndApollo = (
  component: React.ReactElement,
  value: Partial<AuthContextType> = {},
  mocks: readonly MockedResponse<Record<string, unknown>>[] = []
) => {
  const contextValue = {
    ...defaultMockAuthContext,
    ...value,
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider value={contextValue}>
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}>
        {children}
      </MockedProvider>
    </AuthContext.Provider>
  )

  return render(component, { wrapper })
}

export const defaultMockSearchContext = {
  searchQuery: '',
  setSearchQuery: jest.fn(),
}

/** Renders the component inside of a SearchProvider */
export const renderWithSearchContext = (
  component: React.ReactElement,
  value: Partial<SearchContextType> = {},
  mocks: readonly MockedResponse<Record<string, unknown>>[] = []
) => {
  const contextValue = {
    ...defaultMockSearchContext,
    ...value,
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SearchContext.Provider value={contextValue}>
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}>
        {children}
      </MockedProvider>
    </SearchContext.Provider>
  )

  return render(component, { wrapper })
}

export const defaultMockMySpaceContext = {
  mySpace: [],
  disableDragAndDrop: false,
  setDisableDragAndDrop: jest.fn(),
  isAddingWidget: false,
  setIsAddingWidget: jest.fn(),
  initializeMySpace: jest.fn(),
  isCollection: (widget: Widget) => widget.type === 'Collection',
  isGuardianIdeal: (widget: Widget) => widget.type === 'GuardianIdeal',
  isNewsWidget: (widget: Widget) => widget.type === 'News',
  isFeaturedShortcuts: (widget: Widget) => widget.type === 'FeaturedShortcuts',
  isWeather: (widget: Widget) => widget.type === 'Weather',
  canAddCollections: true,
  canAddNews: true,
  canAddWeather: true,
  canAddGuardianIdeal: true,
  canAddFeaturedShortcuts: true,
  addNewsWidget: jest.fn(),
  addGuardianIdeal: jest.fn(),
  addFeaturedShortcuts: jest.fn(),
  addNewCollection: jest.fn(),
  addNewWeatherWidget: jest.fn(),
  editWeatherWidget: jest.fn(),
  handleOnDragEnd: jest.fn(),
  temporaryWidget: '',
  setTemporaryWidget: jest.fn(),
}

/** Renders the component inside of a MySpaceProvider */
export const renderWithMySpaceAndModalContext = (
  component: React.ReactElement,
  value: Partial<MySpaceContextType> = {},
  mocks: readonly MockedResponse<Record<string, unknown>>[] = [],
  authValue: Partial<AuthContextType> = {},
  modalValue: Partial<ModalContextType> = {}
) => {
  const modalContainer = document.createElement('div')
  modalContainer.setAttribute('id', 'modal-root')

  const contextValue = {
    ...defaultMockMySpaceContext,
    ...value,
  }

  const authContextValue = {
    ...defaultMockAuthContext,
    ...authValue,
  }

  const modalContextValue = {
    ...defaultMockModalContext,
    ...modalValue,
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider value={authContextValue}>
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}>
        <MySpaceContext.Provider value={contextValue}>
          <ModalContext.Provider value={modalContextValue}>
            {children}
          </ModalContext.Provider>
        </MySpaceContext.Provider>
      </MockedProvider>
    </AuthContext.Provider>
  )

  return render(component, {
    container: document.body.appendChild(modalContainer),
    wrapper,
  })
}

/** sets up some mocks for the useTheme hook **/
export const mockUseTheme = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  const localStorageMock: { [key: string]: string } = {}
  // eslint-disable-next-line security/detect-object-injection
  const getItemMock = jest.fn((key: string) => localStorageMock[key])
  const setItemMock = jest.fn((key: string, value: string) => {
    // eslint-disable-next-line security/detect-object-injection
    localStorageMock[key] = value
  })
  global.Storage.prototype.getItem = getItemMock
  global.Storage.prototype.setItem = setItemMock

  return { getItemMock, setItemMock }
}
