import ProfessionBarView from "@/components/Professions/ProfessionBarView.vue"
import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import { createRouter, createWebHistory } from "vue-router"

const profession = {
  profession_name: 'Desarrollador Backend',
  current_salary: 5056000,
  future_salaries: [750000, 800000, 850000],
  companies: ['Tuya S.A.'],
  experience: 'SR'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: {} }]
})

describe("ProfessionBarView", () => {
  it("muestra la informacion correcta", async () => {
    const wrapper = mount(ProfessionBarView, {
      props: {profession},
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain(profession.profession_name)
    expect(wrapper.text()).toContain(profession.current_salary.toLocaleString())
  })
})
