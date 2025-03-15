import ProfessionList from "@/pages/Professions/ProfessionList.vue"
import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { createRouter, createWebHistory } from "vue-router"

const flushPromise = () => new Promise(resolve => setTimeout(resolve, 0))

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        "id": 1,
        "profession_name": "Desarrollador Backend",
        "current_salary": "5056000.00",
        "future_salaries": [
          750000,
          800000,
          850000
        ],
        "companies": [
          "Tuya S.A."
        ],
        "experience": "SR"
      },
      {
        "id": 2,
        "profession_name": "Arquitecto/a de Software",
        "current_salary": "8000000.00",
        "future_salaries": [
          10000000,
          11500000,
          13000000
        ],
        "companies": [
          "Tuya S.A."
        ],
        "experience": "SR"
      },
      {
        "id": 3,
        "profession_name": "Fullstack",
        "current_salary": "5500000.00",
        "future_salaries": [
          6500000,
          7000000,
          7500000
        ],
        "companies": [
          "Complemento 360"
        ],
        "experience": "SR"
      }
    ])
  })
)

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: {} }]
})

describe("ProfessionList", () => {
  it('muestra "Cargando..." mientras se obtiene la información', () => {
    router.push("/")
    const wrapper = mount(ProfessionList, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain("Cargando...")
  })

  it("muestra la lista de profesiones después de cargar los datos", async () => {
    router.push("/");
    const wrapper = mount(ProfessionList, {
      global: {
        plugins: [router]
      }
    })
    await flushPromise()  // Esperamos a que la promesa se resuelva
    
    expect(wrapper.text()).toContain("Desarrollador Backend")
    expect(wrapper.text()).toContain("Arquitecto/a de Software")
    expect(wrapper.text()).toContain("Fullstack")
  }, 10000)

  it("verifica que los salarios actuales sean correctos", async () => {
    router.push("/");
    const wrapper = mount(ProfessionList, {
      global: {
        plugins: [router]
      }
    })

    await flushPromise()

    expect(wrapper.text()).toContain("Salario actual: $5056000.00")
    expect(wrapper.text()).toContain("Salario actual: $8000000.00")
    expect(wrapper.text()).toContain("Salario actual: $5500000.00")
  
  })
})