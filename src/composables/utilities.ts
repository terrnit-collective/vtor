import { ref } from 'vue'

export type HtmlString = string

interface UtilityMap {
  [key: string]: {
    id: number
    imageUrl: string
    color: string
    title: string
    htmlTitle?: HtmlString
    content: string
    dateOpened: string
  }[]
}

const state = ref<UtilityMap>({
  en: [
    {
      id: 1,
      imageUrl: '/distribution.svg',
      color: '#FF5D00',
      title: 'Distribution royalty',
      htmlTitle: 'Distribution royalty',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 2,
      imageUrl: '/bonus.svg',
      color: '#22C380',
      title: 'Privileges at crypton events',
      htmlTitle: `Privileges at<br/> crypton events`,
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 3,
      imageUrl: '/allocations.svg',
      color: '#00A6FF',
      title: 'Access to allocations',
      htmlTitle: 'Access to<br/> allocations',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 4,
      imageUrl: '/testing.svg',
      color: '#9D00FF',
      title: 'Beta testing crypton products',
      htmlTitle: 'Beta testing<br/> crypton products',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 5,
      imageUrl: '/cashback.svg',
      color: '#EA2F90',
      title: 'Cashback in the ecosystem',
      htmlTitle: 'Cashback in<br/> the ecosystem',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2025-01-21',
    },
    {
      id: 6,
      imageUrl: '/community.svg',
      color: '#A3BB1B',
      title: 'Private Holder’s community',
      htmlTitle: 'Private Holder’s<br/> community',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2025-01-21',
    },
  ],
  ru: [
    {
      id: 1,
      imageUrl: '/distribution.svg',
      color: '#FF5D00',
      title: 'Распределение роялти',
      htmlTitle: 'Распределение<br/> роялти',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 2,
      imageUrl: '/bonus.svg',
      color: '#22C380',
      title: 'Привилегии на ивентах Crypton',
      htmlTitle: `Привилегии<br/> на ивентах Crypton`,
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 3,
      imageUrl: '/allocations.svg',
      color: '#00A6FF',
      title: 'Доступ к аллокациям',
      htmlTitle: 'Доступ<br/> к аллокациям',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 4,
      imageUrl: '/testing.svg',
      color: '#9D00FF',
      title: 'Бета-тестирование продуктов Crypton',
      htmlTitle: 'Бета-тестирование<br/> продуктов Crypton',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2024-10-21',
    },
    {
      id: 5,
      imageUrl: '/cashback.svg',
      color: '#EA2F90',
      title: 'Кэшбек в экосистеме',
      htmlTitle: 'Кэшбек<br/> в экосистеме',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2025-01-21',
    },
    {
      id: 6,
      imageUrl: '/community.svg',
      color: '#A3BB1B',
      title: 'Закрытое общество холдеров',
      htmlTitle: 'Закрытое общество<br/> холдеров',
      content: 'Nutcrackers — the community of like-minded people that turned in a private club with membership access via NFT. Our concept is built on a strong and friendly community, which involves not only the exchange of experience between participants, but also the joint promotion',
      dateOpened: '2025-01-21',
    },
  ],
})
export function useUtilities() {
  return {
    utilitiesMap: state,
  }
}
