import Notification from "./notification";

describe('Unit test for notification', () => {

  it('should create and errors', () => {
    const notification = new Notification()
    const error = {
      message: 'Error message',
      context: 'customer',
    }

    notification.addError(error)

    expect(notification.messages("customer")).toBe("customer: Error message,");

    const error2 = {
      message: 'Error message 2',
      context: 'customer',
    }

    notification.addError(error2)

    expect(notification.messages("customer")).toBe("customer: Error message,customer: Error message 2,");

    const error3 = {
      message: 'Error message 3',
      context: 'order',
    }

    notification.addError(error3)

    expect(notification.messages("customer")).toBe("customer: Error message,customer: Error message 2,");
    expect(notification.messages()).toBe("customer: Error message,customer: Error message 2,order: Error message 3,");
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    expect(notification.hasErrors()).toBe(true);
  });

  it('should get all errors props', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    expect(notification.getErrors()).toEqual([error]);
  });
});