import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
export const state = () => ({
  blogPosts: [],
  galleryImages: [],
  siteInfo: [],
});

export const mutations = {
  setPosts(state, data) {
    state.blogPosts = data;
  },
  setGalleryImages(state, data) {
    state.galleryImages = data;
  },
  setInfo(state, data) {
    state.siteInfo = data;
  },
};
 
const contextToList = (context, contentRoute) => {
  const preparePath = (key) => `/${contentRoute}/${key.replace('.json', '').replace('./', '')}`;

  return context.keys().map(key => ({
    ...context(key),
    _path: preparePath(key)
  }));
};

export const actions = { 
  async nuxtServerInit({ dispatch }) {
    await dispatch('getSiteInfo');
    await dispatch('getBlogPosts');
    await dispatch('getGalleryImages');
  },
  async getBlogPosts({ state, commit }) {
    const context = await require.context('~/content/blog/', false, /\.json$/);

    const searchposts = await contextToList(context, 'blog');
    commit('setPosts', searchposts.reverse());
  },
  async getGalleryImages({ state, commit }) {
    const context = await require.context('~/content/gallery/', false, /\.json$/);

    const galleryImages = await contextToList(context, 'page');
    commit('setGalleryImages', galleryImages);
  },
  getSiteInfo({ state, commit }) {
    const info = require('~/content/setup/info.json');
    commit('setInfo', info);
  }
};
