import React from 'react';
import { render, fireEvent, waitFor, configure } from '@testing-library/react';

import Button from '../Button';

configure({ testIdAttribute: 'data-test-id' });

const testId = 'hsui-button';

describe('Button', () => {
  it('fires click handler when clicked', () => {
    const clickSpy = jest.fn();
    const { getByTestId } = render(<Button onClick={clickSpy}>Click me</Button>);

    fireEvent.click(getByTestId(testId));

    expect(clickSpy).toHaveBeenCalled();
  });

  it('shows loading text when provided', async () => {
    const { container, getByTestId } = render(<Button isLoading={true} onClick={() => {}} />);

    await waitFor(() => getByTestId(testId));

    expect(container).toMatchSnapshot();
  });

  it('keeps the container the same when switching between isLoading and not isLoading', async () => {
    const onClick = jest.fn();
    const { getByTestId, rerender, asFragment } = render(
      <Button isLoading={true} onClick={onClick} />,
    );

    await waitFor(() => getByTestId(testId));
    const loadingFragment = asFragment();

    rerender(<Button onClick={onClick}>Submit</Button>);
    await waitFor(() => getByTestId(testId));
    const loadedFragment = asFragment();

    // TODO: Use toMatchDiffSnapshot() between the fragments once we can figure out
    //  how to make it use the jest-styled-components plugin
    expect(loadingFragment.firstChild).toMatchSnapshot();
    expect(loadedFragment.firstChild).toMatchSnapshot();
  });
});
