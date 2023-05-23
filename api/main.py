import os, random, shutil
import numpy as np
from pathlib import Path
import xml.etree.ElementTree as ET
from imageai.Classification.Custom import ClassificationModelTrainer

ROOT = 'data'
TRAIN = os.path.join(ROOT, 'train')
TEST = os.path.join(ROOT, 'test')
TRAIN_DOG, TRAIN_CAT, TRAIN_SNAKE = os.path.join(TRAIN, 'dog'), os.path.join(TRAIN, 'cat'), os.path.join(TRAIN, 'snake')
TEST_DOG, TEST_CAT, TEST_SNAKE = os.path.join(TEST, 'dog'), os.path.join(TEST, 'cat'), os.path.join(TEST, 'snake')

# transforms the imageset from its original form to imageai customclassifier form
if os.path.isdir(os.path.join(ROOT, 'archive')): # if the archive directory exists
    TRAIN_SPLIT = 0.8
    ARCHIVE = os.path.join(ROOT, 'archive')
    IMAGES = os.path.join(ARCHIVE, 'images')

    for image in Path(IMAGES).glob('*.png'): # for every image in the images folder
        annotation = image.as_posix().replace('.png', '.xml', 1).replace('images', 'annotations', 1) # get the name of the corresponding annotation file
        category = ET.parse(annotation).getroot()[4][0].text # gets the category from the annotation .xml file
        if random.random() <= TRAIN_SPLIT: # if the random number is less than the training/test split (80% in this case)
            shutil.move(image, TRAIN_DOG if category == 'dog' else TRAIN_CAT) # moves the image into the proper directory in train
        else:
            shutil.move(image, TEST_DOG if category == 'dog' else TEST_CAT) # moves the image into the proper directory in test

    SNAKE_IMAGES = os.path.join(ARCHIVE, 'snake') 
    for image in Path(SNAKE_IMAGES).glob('*.jpg'): # for every image in the snake images folder
        if random.random() <= TRAIN_SPLIT: # if the random number is less than the training/test split 
            shutil.move(image, TRAIN_SNAKE) # moves the image into the proper directory in train
        else:
            shutil.move(image, TEST_SNAKE) # moves the image into the proper directory in test


model_trainer = ClassificationModelTrainer() # creates a new ClassificationModelTrainer instance
model_trainer.setModelTypeAsMobileNetV2() # sets the model type to MobileNetV2
model_trainer.setDataDirectory(ROOT) # sets the directory for the data to ROOT
model_trainer.trainModel(num_experiments = 10, batch_size = 32) # trains the model for 10 epochs in batches of 32