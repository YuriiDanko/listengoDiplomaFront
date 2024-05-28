import { Button, Flex, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';

export const ConfirmModal = ({ title, description, onConfirm, onCancel, opened }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onCancel();
  };

  return (
    <Modal opened={opened} onClose={onCancel} title={title} centered>
      <Text>{description}</Text>
      <Flex justify={'space-between'} gap={20}>
        <Button onClick={handleConfirm} loading={isLoading} fullWidth>
          Confirm
        </Button>
        <Button onClick={onCancel} variant='outline' color='red' fullWidth>
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
};
