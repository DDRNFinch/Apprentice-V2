window.AppStorage = (() => {
  const KEY = "apprenticePlusStateV1";

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function createInitialState() {
    return {
      profile: clone(APP_DATA.defaultProfile),
      settings: clone(APP_DATA.defaultSettings),
      progress: {},
      documents: [],
      notifications: [],
      xp: 0,
      achievements: [],
      customCourses: []
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return createInitialState();
      return { ...createInitialState(), ...JSON.parse(raw) };
    } catch (error) {
      console.error("Storage load failed", error);
      return createInitialState();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error("Storage save failed", error);
      return false;
    }
  }

  function reset() {
    const state = createInitialState();
    save(state);
    return state;
  }

  return { load, save, reset };
})();
