import { version } from "vue";

test("UI library belongs to the Vue 3 major branch", function () {
    expect(version.startsWith("3.")).toBe(true);
});
