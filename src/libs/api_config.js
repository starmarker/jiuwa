const api_urls = {
  index:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx5yJiWnY6peKGMiM-ov6NyspOHfpbFuW2lq6SScQ",
  index_data:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enyFyJm3mZuogGOLi7WjyGmLqYpjhc-8s3Ft",
  is_teacher:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx6yZarm52pnmWTi7VorqJpdg",
  is_signed:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx6yZevnZOUnq2We62byX2lr5OZgso",
  getJiuwa:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enyGyZi7qo7PiJ2UZq2erqJpdg", //inviter
  pick:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3xbmCosOPl6KUpIiayJmvnJO6mZx-dq2Exo2Hq5KHbdS5z4qaxGusn3qjYm0",
  myinfo:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx0yr6zYZuUY5-Vn6WfyKSHr5Odftm1lIqlxn-4rXqjYm0",
  sign:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enxyv5m3oZ3PnmOXia2fv2ils5V4gs7IqaCmxKGsmA",
  levelup:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3vrqGnMd7q6d6o3Scyqy7qJOVfJuMericvYd2dg",
  ill:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3vrqGnMd7q6d6o3Scyqu_mZupqZyKhKBw",
  rescue:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K5vrqCmsaPzqmLaYSgyZi7mZyUiJ-XdqymrqKLsouHfpbGuYqlxn2wo5NpnprAua-V",
  rescue_jiuwa:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K5vrqCmsaPzqmLaYSgyZi7mZyUiJ-XdqymrqJ7qJaIhtbGlYafvJCsnJR-nqrKrLeqk7l4Y5SKuajJeYOd",
  need_rescue:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K5vrqCmsaPzqmLaYSgyZi7mZyUiJ-XdqymrqKLsouHfpbGuYqlxn3apJRqg5m-t6Ju",
  rescued_list:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K5vrqCmsaPzqmLaYSgyZi7mZyUiJ-XdqymrqF_rJSdjs6-qqCFxaW4nJV-iJu6rdGrnaV8lw",
  pick_recourd:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3xbmCosOPl6KUpIiayJmvnJO6mZx-dq2Exo2Hq5KHbdS5z4qaxGusn3qjYm0",
  picked_recourd:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3xbmCosOPl6KUpIiayJmvnJO6mZx-dq2Exn6ls5KHcZbFqYqpu5CkpJRqhIHHvbOjmrlnoYeguZ3HaYOkepxoow",
  is_hundred:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3xbmCosOPl6KUpIiayJmvnJO6mZx-dq19yGahpYqHsJbFqI6YxIC4oHqjYm0",
  isHasJiuwa:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx6yZevnZKUiKOWoLicvYd2dg",
  teacher_list:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3vrqGnMd7q6d6oqqgyZm3gZPOdKKXi7Gjx2mLqIuIgs7HqaCqxoCvnYmIb20",
  t_sign_update:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enyGya23mZ2piHWLZrWjyaOlaZaGgtK-lKCqxoCsnJV-nqbIz6-V",
  rank:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enyDv72ao5q5Z6GGes-tyXmDnQ", //user_type
  t_info:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx5yJiWnY-6gJ-Vn7WpxmiPrnqcaKM",
  uploadPic:
    "MDAwMDAwMDAwMLW60ZOCz6qqimWpY8l9f6OSd2nSxtCFma57rIKKjp6lwL7MmoWlfGSVetupvo2KoomBdaM",
  inviter:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx-y7ynoJ66gKOUZrWiv46DoZR3pODIpX6U",
  bullet:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enxzv76vqpK5lp-Ges-tyXmDnQ",
  illness:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3vrqGnMd7q6d6ooSgyZi7mZyUiISMi7ScvYd2dg",
  getTeam:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enx-y7y3nZK5YpyKhKBw",
  search:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K0vrmGoLtqqKeUpIiayJmvnJO6mZx-dq2Hv41_sopin8-8s3Ft",
  act_detail:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K8x5SKqbyQyZ19enyewL63f5K6fKWMi7Wjx6Ode4pjitbIz6Bgw4-4roSOZ53I36-V",
  editJiuwa:
    "MDAwMDAwMDAwMLW60ZOCz4CkimWpnb5pqKJ9c4K3vrqGnMd7q6d6omOmwK3Rnpq5gJuWes-px6KHrYqHsNm4uW1kw4-sZZRqhKDImJmakbNvcA",
  wxconfig:
    "MDAwMDAwMDAwMLW60ZOC0KKkimWUm8ijraWVd6Tbvtt9o6ujk5yTpHiewL27ZYLLqZyMZbljun1_p4uFhtzGz46gvLGsmA",
  bindphone: {
    url: "MDAwMDAwMDAwMMvT1ZeSunSjfmXLqceNjnY",
    params: {
      module_token:
        "MDAwMDAwMDAwMLW60ZOCz6qqima5rb-Og7N6ma_PuamcpsSluKCWenujr9OvoZvPhISTepyov4mDnQ"
    }
  }
};
export default api_urls;
