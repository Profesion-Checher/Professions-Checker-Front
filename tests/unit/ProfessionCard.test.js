import { mount } from "@vue/test-utils";
import ProfessionCard from "@/components/ProfessionCard.vue"
import { describe, expect } from "vitest";

describe("ProfessionCard", () => {
  it("muestra la informacion correcta", () => {
    const profession = {
      profession_name: 'Desarrollador Backend',
      current_salary: 5056000,
      future_salaries: [750000, 800000, 850000],
      companies: ['Tuya S.A.'],
      experience: 'SR'
    }

    const wrapper = mount(ProfessionCard, {
      props: { profession },
    })

    expect(wrapper.text()).toContain(profession.profession_name);
    expect(wrapper.text()).toContain(profession.current_salary.toLocaleString());
    expect(wrapper.text()).toContain(profession.future_salaries.join(', '));
    expect(wrapper.text()).toContain(profession.companies.join(', '));
    expect(wrapper.text()).toContain(profession.experience);
  })
})