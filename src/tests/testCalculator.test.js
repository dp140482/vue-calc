import { it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import flushPromises from 'flush-promises';
import Calculator from "../components/Calculator.vue";

describe("Test Calculator", () => {
    it("Тестирование первого операнда", () => {
        const wrapper = mount(Calculator);
        const op1 = wrapper.find("input[name=operand1]");
        op1.setValue("1");
        expect(wrapper.vm.op1).toBe(1);
    });
    it("Тестирование второго операнда", () => {
        const wrapper = mount(Calculator);
        const op2 = wrapper.find("input[name=operand2]");
        op2.setValue("1");
        expect(wrapper.vm.op2).toBe(1);
    });
    it("Тестирование суммы", () => {
        const wrapper = mount(Calculator);

        const op1 = wrapper.find("input[name=operand1]");
        op1.setValue("3");

        const op2 = wrapper.find("input[name=operand2]");
        op2.setValue("3");

        const btn = wrapper.find('button[name="+"]');
        btn.trigger("click");
        expect(wrapper.vm.result).toBe(6);
    });
    it("Тестирование разности", () => {
        const wrapper = mount(Calculator);

        const op1 = wrapper.find("input[name=operand1]");
        op1.setValue("3");

        const op2 = wrapper.find("input[name=operand2]");
        op2.setValue("3");

        const btn = wrapper.find('button[name="-"]');
        btn.trigger("click");
        expect(wrapper.vm.result).toBe(0);
    });
    it("Тестирование блокировки операций", async() => {
        const wrapper = mount(Calculator);
        const op1 = wrapper.find("input[name=operand1]");
        await op1.setValue("0");

        const op2 = wrapper.find("input[name=operand2]");
        await op2.setValue("0");
        await flushPromises();
        expect(wrapper.find('button[name="÷"]').element.disabled).toBe(true);
        expect(wrapper.find('button[name="^"]').element.disabled).toBe(true);
        expect(wrapper.find('button[name="div"]').element.disabled).toBe(true);

        await op1.setValue("1");
        await flushPromises();
        expect(wrapper.find('button[name="÷"]').element.disabled).toBe(true);
        expect(wrapper.find('button[name="^"]').element.disabled).toBe(false);
        expect(wrapper.find('button[name="div"]').element.disabled).toBe(true);

        await op1.setValue("0");
        await op2.setValue("-1");
        await flushPromises();
        expect(wrapper.find('button[name="÷"]').element.disabled).toBe(false);
        expect(wrapper.find('button[name="^"]').element.disabled).toBe(true);
        expect(wrapper.find('button[name="div"]').element.disabled).toBe(false);
    });
    it("Тестирование умножения", () => {
        const wrapper = mount(Calculator);

        const op1 = wrapper.find("input[name=operand1]");
        op1.setValue("3");

        const op2 = wrapper.find("input[name=operand2]");
        op2.setValue("3");

        wrapper.find('button[name="×"]').trigger("click");
        expect(wrapper.vm.result).toBe(9);
    });
    it("Тестирование деления", async() => {
        const wrapper = mount(Calculator);

        const op1 = wrapper.find("input[name=operand1]");
        await op1.setValue("3");

        const op2 = wrapper.find("input[name=operand2]");
        await op2.setValue("3");

        wrapper.find('button[name="÷"]').trigger("click");
        await flushPromises();
        expect(wrapper.vm.result).toBe(1);
    });
    it("Тестирование возведения в степень", async() => {
        const wrapper = mount(Calculator);

        const op1 = wrapper.find("input[name=operand1]");
        await op1.setValue("3");

        const op2 = wrapper.find("input[name=operand2]");
        await op2.setValue("3");

        const btn = wrapper.find('button[name="^"]');
        await btn.trigger("click");
        await flushPromises();
        expect(wrapper.vm.result).toBe(27);
    });
    it("Тестирование целочисленного деления", async() => {
        const wrapper = mount(Calculator);

        const op1 = wrapper.find("input[name=operand1]");
        await op1.setValue("5");

        const op2 = wrapper.find("input[name=operand2]");
        await op2.setValue("2");

        const btn = wrapper.find('button[name="div"]');
        await btn.trigger("click");
        await flushPromises();
        expect(wrapper.vm.result).toBe(2);
    });
    it("Тестирование отображения экранной клавиатуры", async() => {
        const wrapper = mount(Calculator);

        await wrapper.find('input[type="checkbox"]').setChecked();
        await flushPromises();
        expect(wrapper.vm.showNumpad).toBe(true);
    });
    it("Тестирование переключения операндов", async() => {
        const wrapper = mount(Calculator);

        await wrapper.find('input[id="op2"]').setChecked();
        await flushPromises();
        expect(wrapper.vm.opchoise).toBe(2);
        await wrapper.find('input[id="op1"]').setChecked();
        await flushPromises();
        expect(wrapper.vm.opchoise).toBe(1);
    });
    it("Тестирование экранной клавиатуры", async() => {
        const wrapper = mount(Calculator);

        await wrapper.find('input[type="checkbox"]').setChecked();
        await wrapper.find('button[name="1"]').trigger("click");
        await wrapper.find('button[name="2"]').trigger("click");
        await wrapper.find('button[name="3"]').trigger("click");
        await wrapper.find('button[name="4"]').trigger("click");
        await wrapper.find('button[name="5"]').trigger("click");
        await wrapper.find('button[name="5"]').trigger("click");
        await wrapper.find('button[name="del"]').trigger("click");
        await wrapper.find('input[id="op2"]').setChecked();
        await wrapper.find('button[name="6"]').trigger("click");
        await wrapper.find('button[name="7"]').trigger("click");
        await wrapper.find('button[name="8"]').trigger("click");
        await wrapper.find('button[name="8"]').trigger("click");
        await wrapper.find('button[name="del"]').trigger("click");
        await wrapper.find('button[name="9"]').trigger("click");
        await wrapper.find('button[name="0"]').trigger("click");

        wrapper.vm.opchoise = 3;
        await wrapper.find('button[name="1"]').trigger("click");
        await wrapper.find('button[name="1"]').trigger("click");
        await wrapper.find('button[name="del"]').trigger("click");

        await flushPromises();
        wrapper.find('button[name="×"]').trigger("click");
        expect(wrapper.vm.result).toBe(838102050);
    });
    it("Тестирование функций", async() => {
        const wrapper = mount(Calculator);

        const op1 = wrapper.find("input[name=operand1]");
        op1.setValue("3");

        const op2 = wrapper.find("input[name=operand2]");
        op2.setValue("3");
        expect(wrapper.vm.calculate()).toBe(6);
        expect(wrapper.vm.cannot()).toBe(false);
        op2.setValue("0");
        expect(wrapper.vm.cannot()).toBe(true);
    });
});