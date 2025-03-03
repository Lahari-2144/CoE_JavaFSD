import java.util.*;

// Enum to define room features
enum RoomFeature {
    PROJECTOR,
    VIDEO_CONFERENCING,
    WHITEBOARD,
    CONFERENCE_PHONE,
    AIR_CONDITIONING
}

// MeetingRoom class
 class MeetingRoom {
    private String roomId;
    private String roomName;
    private int capacity;
    private EnumSet<RoomFeature> features;

    public MeetingRoom(String roomId, String roomName, int capacity, EnumSet<RoomFeature> features) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.capacity = capacity;
        this.features = features;
    }

    public String getRoomId() {
        return roomId;
    }

    public String getRoomName() {
        return roomName;
    }

    public EnumSet<RoomFeature> getFeatures() {
        return features;
    }

    @Override
    public String toString() {
        return roomName;
    }
}

// RoomScheduler class
class RoomScheduler {
    private Map<String, MeetingRoom> rooms;

    public RoomScheduler() {
        this.rooms = new HashMap<>();
    }

    public void addMeetingRoom(MeetingRoom room) {
        rooms.put(room.getRoomId(), room);
        System.out.println("Room added: " + room.getRoomName() + ", ID: " + room.getRoomId());
    }

    public String bookRoom(String roomId, EnumSet<RoomFeature> requiredFeatures) {
        MeetingRoom room = rooms.get(roomId);
        if (room != null && room.getFeatures().containsAll(requiredFeatures)) {
            return "Room " + roomId + " booked successfully.";
        } else {
            return "Room " + roomId + " does not meet the required features.";
        }
    }

    public List<String> listAvailableRooms(EnumSet<RoomFeature> requiredFeatures) {
        List<String> availableRooms = new ArrayList<>();
        for (MeetingRoom room : rooms.values()) {
            if (room.getFeatures().containsAll(requiredFeatures)) {
                availableRooms.add(room.getRoomName());
            }
        }
        System.out.println("Available rooms with " + requiredFeatures + ": " + availableRooms);
        return availableRooms;
    }
}

// Main class to test the implementation
public class MeetingRoomBookingSystem {
    public static void main(String[] args) {
        RoomScheduler scheduler = new RoomScheduler();

        scheduler.addMeetingRoom(new MeetingRoom("001", "Boardroom", 20, 
                EnumSet.of(RoomFeature.PROJECTOR, RoomFeature.CONFERENCE_PHONE, RoomFeature.AIR_CONDITIONING)));
        
        scheduler.addMeetingRoom(new MeetingRoom("002", "Strategy Room", 10, 
                EnumSet.of(RoomFeature.WHITEBOARD, RoomFeature.AIR_CONDITIONING)));

        System.out.println(scheduler.bookRoom("001", EnumSet.of(RoomFeature.PROJECTOR, RoomFeature.CONFERENCE_PHONE)));
        scheduler.listAvailableRooms(EnumSet.of(RoomFeature.AIR_CONDITIONING));
    }
}
