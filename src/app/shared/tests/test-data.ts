export const TEST_DATA = {
  auth: {
    loginRequest: {
      username: 'testUserName@test.com',
      password: 'testPassword'
    },
    signInResponse: {
      userId: '6caca68a-c5eb-4976-add2-24ebfad7e896',
      userName: 'testUserName@test.com',
      accessToken: 'testAccessToken'
    },
    user: {
      id: '6caca68a-c5eb-4976-add2-24ebfad7e896',
      name: 'testUserName@test.com',
    },
    accessToken: 'testAccessToken',
    userId: '6caca68a-c5eb-4976-add2-24ebfad7e896'
  },
  layout: {
    menuItems: [
      {
        url: '/1',
        title: 'menuTitle1',
        icon: 'home',
        permissions: ['CanSeeUsers'],
        hidden: false
      },
      {
        url: '/2',
        title: 'menuTitle2',
        icon: 'home',
        permissions: ['CanSeeUsers'],
        hidden: false
      },
      {
        url: '/3',
        title: 'menuTitle3',
        icon: 'home',
        permissions: ['CanSeeUsers'],
        hidden: false
      }
    ]
  },
  household: {
    household: {
      id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      name: 'Household1 name',
      symbol: 'Household1 symbol',
      description: 'Household1 description',
      street: 'Household1 street',
      city: 'Household1 city',
      country: 'Household1 country',
      zipCode: 'Household1 zipCode',
      version: 1
    },
    households: [
      {
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      },
      {
        id: '55798c3b-5551-489b-9dd2-d7e59691a368',
        name: 'Household2 name',
        symbol: 'Household2 symbol',
        description: 'Household2 description',
        street: 'Household2 street',
        city: 'Household2 city',
        country: 'Household2 country',
        zipCode: 'Household2 zipCode',
        version: 1
      },
      {
        id: 'b28e143a-a64a-469a-9704-a294cc7356cf',
        name: 'Household3 name',
        symbol: 'Household3 symbol',
        description: 'Household3 description',
        street: 'Household3 street',
        city: 'Household3 city',
        country: 'Household3 country',
        zipCode: 'Household3 zipCode',
        version: 1
      }
    ],
    createHousehold: {
      userId: '6caca68a-c5eb-4976-add2-24ebfad7e896',
      id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      name: 'Household1 name',
      symbol: 'Household1 symbol',
      description: 'Household1 description',
      street: 'Household1 street',
      city: 'Household1 city',
      country: 'Household1 country',
      zipCode: 'Household1 zipCode',
      version: 1
    },
    modifyHousehold: {
      id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      name: 'Household1 name',
      symbol: 'Household1 symbol',
      description: 'Household1 description',
      street: 'Household1 street',
      city: 'Household1 city',
      country: 'Household1 country',
      zipCode: 'Household1 zipCode',
      version: 1
    },
    filter : {
      pageNumber: 1,
      pageSize: 10,
      searchText: '',
      sortingField: 'name',
      sortDirection: 'asc' as 'asc'
    }
  }
};
