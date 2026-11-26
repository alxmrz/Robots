const mockMount = jest.fn();
const mockCreateApp = jest.fn().mockImplementation(function () {
    return { mount: mockMount };
});

jest.mock('vue', () => ({
    createApp: mockCreateApp
}));

jest.mock('@app/components/App.vue', () => ({ __esModule: true, default: {} }), { virtual: true });

test("main mounts the app on the #app element", function () {
    require('@app/main');

    expect(mockCreateApp).toHaveBeenCalledTimes(1);
    expect(mockMount).toHaveBeenCalledWith('#app');
});
