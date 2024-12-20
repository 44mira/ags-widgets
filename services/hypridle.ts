class HypridleService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        "is-active": ["boolean", "rw"],
      },
    );
  }

  #isActive = true;

  get is_active() {
    return this.#isActive;
  }

  set is_active(state: boolean) {
    if (state) {
      Utils.execAsync("hyprctl dispatch exec hypridle");
    } else {
      Utils.execAsync("killall hypridle");
    }

    this.#isActive = state;
    this.changed("is-active");
  }

  constructor() {
    super();
    const getState = () => Utils.exec("pgrep hypridle");

    // poll on existence of hypridle (optional, only if hypridle is modified externally)
    // Utils.interval(10000, () => {
    //   const state = Boolean(getState());
    //
    //   if (state != this.#isActive) {
    //     this.#isActive = state;
    //     this.changed("is-active");
    //   }
    // });

    // initialize
    this.#isActive = Boolean(getState());
  }
}

const service = new HypridleService();

export default service;
