import json
import random
from typing import List, Optional

from fastapi import FastAPI, File, Form, UploadFile
from pydantic import BaseModel

app = FastAPI()


class Detection(BaseModel):
    x: float
    y: float
    width: float
    height: float
    className: str
    confidence: float


class ImageMetadata(BaseModel):
    name: str
    dimensions: str


class ImageData(BaseModel):
    url: str
    detections: List[Detection]
    metadata: ImageMetadata


def load_demo_detections() -> List[dict]:
    with open("./public/image_data.json") as f:
        return json.load(f)


@app.post("/search", response_model=List[ImageData])
async def search(
    query: Optional[str] = Form(None),
    name: Optional[str] = Form(None),
    dimensions: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
) -> List[ImageData]:
    results: List[ImageData] = []
    for image_with_dets in load_demo_detections():
        image_data = ImageData(
            url=image_with_dets["url"],
            detections=[
                Detection(
                    x=d["x"],
                    y=d["y"],
                    width=d["width"],
                    height=d["height"],
                    className=d["className"],
                    confidence=d["confidence"],
                )
                for d in image_with_dets["detections"]
            ],
            metadata=ImageMetadata(
                name=image_with_dets["metadata"]["name"],
                dimensions=image_with_dets["metadata"]["dimensions"],
            ),
        )
        results.append(image_data)

    return results
